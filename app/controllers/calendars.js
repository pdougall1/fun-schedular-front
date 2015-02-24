import Ember from 'ember';
import CalendarMixin from "ember-calendar-builder/mixins/calendar-mixin";

export default Ember.Controller.extend(CalendarMixin, {
	needs: ['currentUser'],
	currentUser: Ember.computed.alias('controllers.currentUser'),
	queryParams: ['currentMonth'],
	currentMonth: '2015-01',
	calendarOptions: { hasNewEventButton: true },

	calendarDate: function () {
		return this.get('currentMonth');
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
