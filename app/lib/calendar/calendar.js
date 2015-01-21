import Ember from 'ember';
import Month from './month';

export default Ember.Object.extend({
  // initialize with createMonth(currentMonth)

  createMonth: function (currentMonth) {
    var month = Month.create({ currentMonth: currentMonth })
    var dateKey = moment(month.get('guideDate')).format('YYYY-MM')
    this.set(dateKey, month)
    return month
  },

  newItemsRepo: [],

  watchNewItems: function () {
    this.addItems(this.get('newItemsRepo.content.content'))
  }.observes('newItemsRepo.length'),

  addItems: function (items) {
    var self = this
    var groups = this.groupItems(items)
    debugger
    // for each key in the groups Object
    // find of create the month
    // add the month to self    
  }, 



  // addItems: (items) ->
  //   self = @
  //   groups = @groupItems(items)
  //   for key, group of groups
  //     month = if self[key] then self[key] else self.createMonth(key)
  //     month.setEvents(group)
  //     self.set(key, month)



  addItem: function (item) {
    var dateKey = moment(item.get('date')).format('YYYY-MM')
    var month = this.findOrCreate(dateKey)
    month.addEvent(item)
    return this.set(dateKey, month)
  },

  findOrCreate: function (dateKey) {
    var currentMonth,
      month = this.get(dateKey);
    if (month) {
       currentMonth = month;
    } else {
      currentMonth = this.createMonth(dateKey);
    }
    return currentMonth
  },

  getMonthKey: function (item) {
    item.get('date').split("-").slice(0, 2).join("-")
  },

  groupItems: function (items) {
    var self = this
    var callback = function (item) {
      return self.getMonthKey(item)
    }

    _.groupBy(items, callback)
  }

});




