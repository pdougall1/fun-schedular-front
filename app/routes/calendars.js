import Calendar from '../lib/calendar/calendar';
import AuthenticatedRoute from './authenticated';

export default AuthenticatedRoute.extend({

	queryParams: {
		currentMonth: {
			refreshModel: true
		}
	},

	model: function (params) {
		console.log('LOTS OF GOOD');
		var events = this.store.find('event', { currentMonth: params.currentMonth });
		var calendar = Calendar.create()
		calendar.findOrCreate(params.currentMonth);
		calendar.addItems(events);
		return calendar
	},

	actions: {
		newEvent: function (day) {
			var formattedDate, params
			formattedDate = day.get('moment').format('YYYY-MM-DD');
			params = { eventDate: formattedDate };
			this.transitionTo('create.details', { queryParams: params });
		},

		showEvent: function (event) {
			console.log("focus on event : " + event.get('id'))
		}
	}
});
