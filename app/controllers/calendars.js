import Ember from 'ember';
import Calendar from '../lib/calendar/calendar';

export default Ember.ObjectController.extend(Ember.Evented, {
	needs: ['currentUser'],
	currentUser: Ember.computed.alias('controllers.currentUser'),
	queryParams: ['currentMonth'],

	currentMonth: function () {
		return moment().format('YYYY-MM');
	}.property(),

	currentCallendarMonth: function () {
		return this.get('content')[this.get('currentMonth')];
	}.property('currentMonth'),

	updateMonth: function () {
		if (this.get('calendar')) {
			var newMonth = this.get('calendar').findOrCreate(this.get('currentMonth'));
			this.set('content', newMonth);			
		}
	}.observes('currentMonth'),

	addEvent: function (event) {
		this.get('content').addItem(event);
	},

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
			this.trigger('dateChange');
		},

		nextMonth: function () {
			var newMonth = moment(this.get('currentMonth'), 'YYYY-MM')
				.add(1, 'month')
				.format("YYYY-MM");

			this.transitionToRoute('calendars', {queryParams: {currentMonth: newMonth }});
			this.trigger('dateChange');
		}
	}
});
