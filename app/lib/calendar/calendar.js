import Ember from 'ember';
import Month from './month';

export default Ember.Object.extend({
  // initialize with createMonth(currentMonth)

  createMonth: function (currentMonth, currentDateTime) {
    var month = Month.create({ currentMonth: currentMonth, currentDateTime: currentDateTime });
    var dateKey = moment(month.get('guideDate')).format('YYYY-MM');
    this.set(dateKey, month);
    return month;
  },

  setChosen: function () {
    var chosenMonth;
    chosenMonth = moment(this.get('chosenMonth')).format('YYYY-MM');
    this.findOrCreate(chosenMonth).resetChosen(this.get('chosen'));
  }.observes('chosen'),

  addItems: function (items) {
    var groups, month;
    var _this = this;

    items.then(function (items) {
      var groups = _this.groupItems(items.get('content'));
      for (var monthKey in groups) {
        month = _this.findOrCreate(monthKey);
        month.setEvents(groups[monthKey]);
        _this[monthKey] = month
      }
    });
  },

  addItem: function (item) {
    var monthKey = moment(item.get('date')).format('YYYY-MM');
    var month = this.findOrCreate(monthKey);
    month.addEvent(item);
    return this.set(monthKey, month);
  },

  findOrCreate: function (monthKey, currentDateTime) {
    if (monthKey.constructor.name === 'Moment') {
      monthKey = monthKey.format('YYYY-MM');
    }
    var currentMonth,
      month = this.get(monthKey);
    if (month) {
       currentMonth = month;
    } else {
      if (!currentDateTime) {
        currentDateTime = this.get('currentDateTime');
      }
      currentMonth = this.createMonth(monthKey, currentDateTime);
    }
    return currentMonth;
  },

  getMonthKey: function (item) {
    return moment(item.get('startTime')).format('YYYY-MM')
  },

  groupItems: function (items) {
    var self = this;
    var callback = function (item) {
      return self.getMonthKey(item);
    };

    return _.groupBy(items, callback);
  }

});
