// import Ember from 'ember';
import AuthenticatedRoute from './authenticated';

export default AuthenticatedRoute.extend({

	model: function () {
		return this.store.createRecord('event', {
			startTime: new Date(),
			endTime: new Date()
		});
	},

	actions: {
		goToTab: function (route) {
			this.transitionTo(route);
		}, 

		chooseDate: function (givenMoment, type) {
			var controller = this.get('controller');
			var newMoment = moment(controller.get(type + 'Time'));
			newMoment.year(givenMoment.year());
			newMoment.month(givenMoment.month());
			newMoment.date(givenMoment.date());
			controller.set(type + 'Time', newMoment.toDate());
		},

		chooseTime: function (givenMoment, type) {
			this.get('controller').set(type + 'Time', moment(givenMoment).toDate());
		}, 

		chooseVenue: function (googlePlace) {
			if (googlePlace.geometry) {
				var venue = this.store.createRecord('venue');
		        venue.set('latitude', googlePlace.geometry.location.lat());
		        venue.set('longitude', googlePlace.geometry.location.lng());
		        venue.set('address', googlePlace.formatted_address);
		        venue.set('name', googlePlace.name);
		        venue.set('googlePlaceId', googlePlace.place_id);
		        this.set('venue', venue);
		        this.get('controller').set('venue', venue);
			}
		},

		submitEvent: function () {
			var venue = this.get('controller.venue');
			var _event = this.get('controller.model');
			_event.save().then( function (savedEvent) {
				venue.set('eventId', savedEvent.get('id'));
				venue.save();
			});						

			this.get('controller.controllers.calendars').addEvent(_event);
			var params = { currentMonth: moment(_event.get('moment')).format('YYYY-MM') };
			this.transitionTo('calendars', { queryParams: params } );
		},

		cancelNewEvent: function () {
			this.get('controller.model').deleteRecord();
			this.transitionTo('calendars');
		}
	}
});
