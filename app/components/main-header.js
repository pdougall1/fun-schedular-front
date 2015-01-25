import Ember from 'ember';

export default Ember.Component.extend({
  loggingIn: false,
  signupIsShowing: false,

  actions: {
  	backToHome: function () {
  		this.sendAction('toCalendar');
  	},

  	logout: function () {
  		this.sendAction('logout');	
  	}
  }

});
