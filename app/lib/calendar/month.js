import Ember from 'ember';
import Day from './day';

export default Ember.Object.extend({

  // need to pass in { currentMonth: YYYY-MM }

  init: function() {
    this.set('guideDate', moment(this.get('currentMonth'), "YYYY-MM-DD"));
    this.set('currentDateTime', this.get('currentDateTime'));
    return this.setUpMonth();
  },

  setUpMonth: function() {
    this.daysInMonth = this._getDaysInMonth();
    this.allDays = this._addSurroundingDays(this.daysInMonth);
    this._setDays(this.allDays);
    return this._orderIntoWeeks();
  },

  guideDate: function () {
    return moment();
  }.property(),

  month: function () {
    return moment(this.get('guideDate')).get('month') + 1;
  },

  addEventsToDays: function () {
    var events = this.get('allEvents');
    var self = this;
    events.forEach( function (event) {
      var key = event.get('date');
      var day = self.get(key);
      day.addItem(event);
      self.set(key, day);
    });
  }.observes('allEvents.length'),

  allEvents: [],

  // INTERFACE

  setEvents: function (events) {
    this.set('allEvents', events);
    return this;
  },

  addEvent: function (event) {
    var events = this.get('allEvents');
    events.addObject(event);
    this.set('allEvents', events);
    return this;
  },

  resetChosen: function (chosenMoment) {
    var chosenMoment = moment(chosenMoment);
    var days = this.daysInMonth;
    var _this = this;
    days.forEach(function (day) {
      day.set('chosen', false);
    });
    
    days.find( function (day) {
      return day.moment.date() === chosenMoment.date();
    }).set('chosen', true);
  },

  // UTITLITY METHODS

  _setDays: function (allDays) {
    var self = this;
    var keys = [];
    allDays.forEach( function (day) {
      var key = moment(day.get('moment')).format('YYYY-MM-DD');
      keys.pushObject(key);
      self.set(key, day);
    });
    this.daysKeys = keys;
  },

  _getDaysInMonth: function () {
    var day = this.get('guideDate');
    var date = moment(day).startOf('month').toDate();
    var month = moment(date).get('month');
    var days = [];
    while (date.getMonth() == month) { //if that date is in the right month
      day = Day.create({ date: date, uniqueBy: 'id', sortProperties: 'date' });
      day.set('inMonth', true);
      days.pushObject(day);
      date.setDate(date.getDate() + 1); // then advance the loop
    }
    return days;
  },

  _addSurroundingDays: function (daysInMonth) {
    var firstDay = daysInMonth[0].get('moment');
    var lastDay = daysInMonth[daysInMonth.length - 1].get('moment');

    _.range(1, 7).forEach( function (count) {
      var newMom = moment(lastDay).add('days', count);
      var newDay = Day.create({ date: newMom });
      newDay.set('month', 'previous');
      if (moment(lastDay).add('days', count).get('week') == moment(lastDay).get('week')) {
        daysInMonth.pushObject(newDay);
      }
    });

    _.range(1, 7).forEach( function (count) {
      var newMom = moment(firstDay).subtract('days', count);
      var newDay = Day.create({ date: newMom });
      newDay.set('month', 'next');
      if (moment(newMom).get('week') == moment(firstDay).get('week')) {
        daysInMonth.push(newDay);
      }
    });

    return daysInMonth;
  },

  _orderIntoWeeks: function() {
    var allDays, callback, iterator, key, weeks, _weeks;
    allDays = this._getAllDays();
    callback = function(acc, day) {
      var week;
      week = moment(day.get('moment')).get('week');
      if (acc[week]) {
        acc[week].push(day);
      } else {
        acc[week] = [day];
      }
      return acc;
    };
    _weeks = allDays.reduce(callback, {});
    weeks = [];
    iterator = function(day) {
      return day.moment.unix();
    };
    for (key in _weeks) {
      weeks.push(_.sortBy(_weeks[key], iterator));
    }
    return this.set('weeks', weeks);
  },

  _getAllDays: function() {
    var self;
    self = this;
    return this.daysKeys.map(function(key) {
      return self.get(key);
    });
  }

});

