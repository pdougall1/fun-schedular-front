import Ember from 'ember';

export default Ember.Component.extend({

	// didInsertElement: function () {
	// 	var calendar = this.get('calendar');
	// 	calendar.set('chosen', this.get('currentDateTime'));
	// 	var currentMonth = this.get('calendar').findOrCreate(this.get('currentDateTime'), this.get('currentDateTime'));
	// 	this.set('month', currentMonth);
	// },

	// calendar: function () {
	// 	// memoize calendar
	// 	var calendar = this.memoCal;
	// 	if (calendar) {
	// 		return calendar;
	// 	} else {
	// 		this.memoCal = Calendar.create();
	// 		return this.memoCal;
	// 	}
	// }.property(),

	// currentMonth: function () {
	// 	return moment().format('YYYY-MM');
	// }.property(),

	// update: function () {
	// 	if (this.get('calendar')) {
	// 		var newMonth = this.get('calendar').findOrCreate(this.get('currentMonth'), this.get('currentDateTime'));
	// 		this.set('month', newMonth);			
	// 	}
	// }.observes('currentMonth'),

	// currentMonthFormatted: function () {
	// 	return moment(this.get('currentMonth'), 'YYYY-MM')
	// 		.format('MMMM YYYY');
	// }.property('currentMonth'),

	// actions: {
	// 	chooseDate: function (day) {
	// 		this.get('calendar').set('chosen', day.moment);
	// 		this.sendAction('action', day.moment, this.get('type'));
	// 	},

	// 	previousMonth: function () {
	// 		var newMonth = moment(this.get('currentMonth'), 'YYYY-MM')
	// 			.subtract(1, 'month')
	// 			.format("YYYY-MM");
	// 		this.set('currentMonth', newMonth);
	// 	},

	// 	nextMonth: function () {
	// 		var newMonth = moment(this.get('currentMonth'), 'YYYY-MM')
	// 			.add(1, 'month')
	// 			.format("YYYY-MM");
	// 		this.set('currentMonth', newMonth);
	// 	}
	// }

});
