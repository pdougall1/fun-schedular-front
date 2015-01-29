// import Ember from 'ember';
import AuthenticatedRoute from './authenticated';

export default AuthenticatedRoute.extend({

	actions: {
		newEvent: function (day) {
			var formattedDate, params
			formattedDate = day.get('moment').format('YYYY-MM-DD');
			params = { eventDate: formattedDate };
			this.transitionTo('create.details', { queryParams: params });
		}
	}
});
