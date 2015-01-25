import Ember from 'ember';

export default Ember.Controller.extend({

  init: function() {
    this._super();
    if (Ember.$.cookie('token') && Ember.$.cookie('email')) {
      this.setupAuthHeader(Ember.$.cookie('token'), Ember.$.cookie('email'));
    }
  },

  attemptedTransition: null,
  token: Ember.$.cookie('token'),
  email: Ember.$.cookie('email'),

  reset: function() {
    this.setProperties({
      email: null,
      password: null,
      token: null
    });
    Ember.$.ajaxSetup({
      headers: {
        'Authorization': 'Token none'
      }
    });
  },

  tokenChanged: function() {
    if (Ember.isEmpty(this.get('token'))) {
      Ember.$.removeCookie('token');
      Ember.$.removeCookie('email');
    } else {
      Ember.$.cookie('token', this.get('token'));
      Ember.$.cookie('email', this.get('email'));
    }
  }.observes('token'),

  actions: {
    login: function() {
      var _this = this;

      var attemptedTransition = this.get('attemptedTransition');
      var data = this.getProperties('email', 'password');

      // clear form fields
      this.setProperties({email: null, password: null});

      Ember.$.post('http://localhost:3000/authorizations', data).then(function(response) {
        var key = _this.get('store').createRecord('apiKey', {
          authToken: response.auth_token,
          email: data.email
        });

        key.save();
        _this.setupAuthHeader(key);

        _this.setProperties({
          token: key.get('authToken'),
          email: key.get('email')
        });

        if (attemptedTransition) {
          attemptedTransition.retry();
          _this.set('attemptedTransition', null);
        } else {
          _this.transitionToRoute('/');
        }

      }, function(error) {
        if (error.status === 401) {
          alert("Invalid password. Please try again.");
        }
      });
    },
  },

  // private
  setupAuthHeader: function(key) {
    Ember.$.ajaxSetup({
      headers: {
        'Authorization': 'Token token="' + key.get('token') + '",email="' + key.get('email') + '"'
      }
    });
  }

});
