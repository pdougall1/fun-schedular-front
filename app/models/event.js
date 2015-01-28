import DS from 'ember-data';

export default DS.Model.extend({

	startTime: DS.attr('date'),
	endTime: DS.attr('date'),
	description: DS.attr('string'),
	name: DS.attr('string'),
	facebookId: DS.attr('string'),
	createdAt: DS.attr('date'),
	updatedAt: DS.attr('date'),
	privacyStatus: DS.attr('string'),
	users: DS.hasMany('user'),
	venue: DS.belongsTo('venue')

});
