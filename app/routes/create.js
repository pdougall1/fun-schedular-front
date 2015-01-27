import Ember from 'ember';
import AuthenticatedRoute from './authenticated';

export default AuthenticatedRoute.extend({

	model: function () {
		return this.store.createRecord('event', {
			startTime: moment(),
			endTime: moment()
		});
	},

	actions: {
		goToTab: function (route) {
			this.transitionTo(route);
		}, 

		chooseDate: function (givenMoment, type) {
			var controller = this.get('controller')
			var newMoment = moment(controller.get(type + 'Time'));
			newMoment.year(givenMoment.year());
			newMoment.month(givenMoment.month());
			newMoment.date(givenMoment.date());
			controller.set(type + 'Time', newMoment);
		},

		chooseTime: function (givenMoment, type) {
			this.get('controller').set(type + 'Time', moment(givenMoment));
		}
	}

});
