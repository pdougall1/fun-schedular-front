import Ember from 'ember';

export default Ember.ObjectController.extend({

  isAuthenticated: function() {
    return this.get('model.isLoaded');
  }.property('model.isLoaded')
  
});
