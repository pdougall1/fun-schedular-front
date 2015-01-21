import Ember from 'ember';

export default Ember.View.extend({

	reset: function () {
	    var height = (parseInt($('body').css('height')) - 135) / $('.week').length
	    $('.main-calendar .calendar .day').css('height', height)
	},

	didInsertElement: function () {
		this.reset();
		var _this = this;
		this.get('controller').on('dateChange', function () {
			// this sucks, there must be a better way!	
		    Ember.run.next(this, function () {
			    _this.reset()
		    });
		});
	}

});
