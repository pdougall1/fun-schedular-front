import Ember from 'ember';

export default Ember.ObjectController.extend({
	needs: ['currentUser'],
	currentUser: Ember.computed.alias('controllers.currentUser'),

	tabs: [
		{name: 'Details', route: 'create.details'},
		{name: 'Time', route: 'create.time'},
		{name: 'Location', route: 'create.location'},
		{name: 'People', route: 'create.people'},
	]
});
