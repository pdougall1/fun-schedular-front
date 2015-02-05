import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['event-bar'],
  classNameBindings: ['isHighlighted'],

  isHighlighted: function () {
      return this.get('event.highlighted');
  }.property('event.highlighted'),

  click: function () {
  	this.sendAction('action', this.get('event'));
  }

});
