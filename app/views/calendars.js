import Ember from 'ember';

export default Ember.View.extend({

	didInsertElement: function () {
	    var height = (parseInt($('body').css('height')) - 135) / $('.week').length
	    $('.main-calendar .calendar .day').css('height', height)
	}

});
