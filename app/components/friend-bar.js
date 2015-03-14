import Ember from 'ember';

export default Ember.Component.extend({
  mouseEnter: function () {
    this.sendAction('sendMouseEnter', this.get('friend'));
  },

  mouseLeave: function () {
    this.sendAction('sendMouseLeave', this.get('friend'));
  },

  click: function () {
    this.sendAction('sendClick', this.get('friend'));
  }
});
