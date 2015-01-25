import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['currentUser'],

  init: function() {
    this._super();

    var auth_token, email;
    auth_token = Ember.$.cookie('token');
    email = Ember.$.cookie('email');
    if (auth_token && email) {
      this.establishApiKey(auth_token, email);
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
    this.resetCurrentUser();
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
        data
        _this.establishApiKey(response.auth_token, data.email);

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
  establishApiKey: function (auth_token, email) {
    var key = this.get('store').createRecord('apiKey', {
      authToken: auth_token,
      email: email
    });

    key.save();
    this.setupAuthHeader(key);
    this.setupCurrentUser();
    this.setProperties({
      authToken: key.get('authToken'),
      email: key.get('email')
    });
  },

  setupAuthHeader: function(key) {
    
    var token = 'Token token="' + key.get('authToken') + '",email="' + key.get('email') + '"'
    console.log(token)
    Ember.$.ajaxSetup({
      headers: {
        'Authorization': token 
      }
    });
  },

  setupCurrentUser: function() {
    var _this = this;
    this.store.find('user', 'current').then(function(user) {
      _this.get('controllers.currentUser').set('content', user);
    });
  },

  resetCurrentUser: function() {
    this.get('controllers.currentUser').set('content', null);
    this.store.unloadAll('user');
  }

});
