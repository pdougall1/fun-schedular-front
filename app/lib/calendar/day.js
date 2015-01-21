import Ember from 'ember';

export default Ember.Object.extend({

  // --- optional parameters ---
  // date: < date of this day >  :  this is required, can be either a moment object or a string "YYYY-MM-DD"
  // uniqueBy: < attribute name >  :  this will set the attribute that serves as criteria for unique items
  // sortProperties: < attribute name >  :  this will set the attribute that is used to keep the order of the array


  init: function() {
    var date;
    if (moment.isMoment(this.get('date'))) {
      date = this.get('date');
    } else {
      date = moment(this.get('date'));
    }
    if (moment(date).format("YYYY-MM-DD") === moment().format("YYYY-MM-DD")) {
      this.set('today', true);
    }
    this.set('moment', date);
    this.set('content', Ember.A([]));
    this.itemUniqueByProps = [];
    return this
  },
  
  ofMonth: function() {
    var m;
    m = moment(this.get('moment'));
    return m.format('DD');
  }.property(),

  inMonth: false,

  month: 'current',

  formatted: function() {
    return moment(this.get('moment')).format("YYYY-MM-DD");
  }.property('date'),

  formattedDay: function() {
    return moment(this.get('moment')).format("D");
  }.property('date'),

  addItem: function(item) {
    var prop, uniqueBy;
    uniqueBy = this.get('uniqueBy');
    if (uniqueBy) {
      prop = item.get(uniqueBy);
      if (!this.itemUniqueByProps.contains(prop)) {
        this.itemUniqueByProps.addObject(prop);
        return this.addObject(item);
      }
    } else {
      return this.addObject(item);
    }
  },

  removeItem: function(item) {
    var newArr, uniqueBy;
    newArr = this.reject(function(i) {
      return item === i;
    });
    this.set('content', newArr);
    uniqueBy = this.get('uniqueBy')
    if (uniqueBy) {
      return this.itemUniqueByProps = this.itemUniqueByProps.reject(function(prop) {
        return prop = item.get(prop);
      });
    }
  }

});


