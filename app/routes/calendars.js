import AuthenticatedRoute from './authenticated';

export default AuthenticatedRoute.extend({

	queryParams: {
		currentMonth: {
			refreshModel: true
		}
	},

	model: function (params) {
		return this.store.find('event', { currentMonth: params.currentMonth });
	},

	setupController: function (controller, model) {
		controller.set('calendarEvents', model);
	},

	actions: {
		newEvent: function (day) {
			var params
			params = { eventDate: day.dateKey };
			this.transitionTo('create.details', { queryParams: params });
		},

		showEvent: function (event) {
			console.log("focus on event : " + event.get('id'))
		}
	}
});
