import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['currentUser'],

  init: function() {
    this._super();

    var authToken, email;
    authToken = Ember.$.cookie('authToken');
    email = Ember.$.cookie('email');
    if (authToken && email) {
      this.establishApiKey(authToken, email);
    }
  },

  attemptedTransition: null,
  authToken: Ember.$.cookie('authToken'),
  email: Ember.$.cookie('email'),

  reset: function() {
    this.setProperties({
      email: null,
      password: null,
      authToken: null
    });
    Ember.$.ajaxSetup({
      headers: {
        'Authorization': 'Token none'
      }
    });
    this.resetCurrentUser();
  },

  tokenChanged: function() {
    if (Ember.isEmpty(this.get('authToken'))) {
      Ember.$.removeCookie('authToken');
      Ember.$.removeCookie('email');
    } else {
      Ember.$.cookie('authToken', this.get('authToken'));
      Ember.$.cookie('email', this.get('email'));
    }
  }.observes('authToken'),

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
  establishApiKey: function (authToken, email) {
    var key = this.get('store').createRecord('apiKey', {
      authToken: authToken,
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
    var authToken = 'Token token="' + key.get('authToken') + '",email="' + key.get('email') + '"'
    Ember.$.ajaxSetup({
      headers: {
        'Authorization': authToken 
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
