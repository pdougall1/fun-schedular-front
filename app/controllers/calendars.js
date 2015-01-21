import Ember from 'ember';
import Calendar from '../lib/calendar/calendar';

export default Ember.ObjectController.extend({
	queryParams: ['currentMonth'],

	calendar: function () {
		// memoize calendar
		var calendar = this.memoCal
		if (calendar) {
			return calendar
		} else {
			this.memoCal = Calendar.create()
			return this.memoCal
		}
	}.property(),

	currentMonth: function () {
		return moment().format('YYYY-MM');
	}.property(),

	update: function () {
		if (this.get('calendar')) {
			var newMonth = this.get('calendar').findOrCreate(this.get('currentMonth'));
			this.set('content', newMonth);			
		}
	}.observes('currentMonth'),

	currentMonthFormatted: function () {
		return moment(this.get('currentMonth'), 'YYYY-MM')
			.format('MMMM YYYY');
	}.property('currentMonth'),

	actions: {
		previousMonth: function () {
			var newMonth = moment(this.get('currentMonth'), 'YYYY-MM')
				.subtract(1, 'month')
				.format("YYYY-MM");

			this.transitionToRoute('calendars', {queryParams: {currentMonth: newMonth }});
		},

		nextMonth: function () {
			var newMonth = moment(this.get('currentMonth'), 'YYYY-MM')
				.add(1, 'month')
				.format("YYYY-MM");

			this.transitionToRoute('calendars', {queryParams: {currentMonth: newMonth }});
		}
	}
});
