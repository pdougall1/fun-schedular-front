import AuthenticatedRoute from './authenticated';

export default AuthenticatedRoute.extend({

	queryParams: {
		currentMonth: {
			refreshModel: true
		}
	},

	model: function (params) {
		return Em.RSVP.hash({
      events:  this.store.find('event', { currentMonth: params.currentMonth }),
      friends: this.store.find('friend', { user_id: 2 })
    });
	},

	setupController: function (controller, model) {
		controller.set('calendarEvents', model.events);
		controller.set('friends', model.friends);
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
