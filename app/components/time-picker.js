import Ember from 'ember';

export default Ember.Component.extend({

	times: function () {
		var times = []
		var count = 0
		var time = moment(this.get('currentDateTime')).startOf('day');
		while (count !== 97) {
			times.pushObject({
				formatted: time.format("h:mm A"),
				time: moment(time)
			});
			time = time.add(15, 'minutes');
			count = count + 1
		}
		return times
	}.property(),

	addTimeValuesToPassedInTime: function (newTime) {
		var passedIn = moment(this.get('currentDateTime'));
		passedIn.hour(newTime.hour());
		passedIn.minutes(newTime.minutes());
		passedIn.seconds(newTime.seconds());
		return passedIn;
	},

	change: function (event) {
		var time = this.get('times').find(function (t) {
			return event.target.value === t.formatted
		});
		var newTime = this.addTimeValuesToPassedInTime(time.time);
		this.sendAction('action', newTime, this.get('type'));
	}

});
