import AuthenticatedRoute from './authenticated';

export default AuthenticatedRoute.extend({

	queryParams: {
		currentMonth: {
			refreshModel: true
		}
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
