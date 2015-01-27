import Ember from 'ember';

export default Ember.ObjectController.extend({
	formattedBeginDate: function () {
		return moment(this.get('beginTime')).format("dddd, MMMM Do YYYY");
	}.property('beginTime'),

	formattedBeginTime: function () {
		return moment(this.get('beginTime')).format("h:mm A");
	}.property('beginTime'),

	formattedEndDate: function () {
		return moment(this.get('endTime')).format("dddd, MMMM Do YYYY");
	}.property('endTime'),

	formattedEndTime: function () {
		return moment(this.get('endTime')).format("h:mm A");
	}.property('endTime')
});
