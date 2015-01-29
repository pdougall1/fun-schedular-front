import Ember from 'ember';

export default Ember.TextField.extend({
	setupAutocomplete: function () {
		var _this = this;
		var autocomplete = new google.maps.places.Autocomplete(document.getElementById(this.get('elementId')));
		this.set('autocomplete', autocomplete);

		var callback = function () {
			var googlePlace = autocomplete.getPlace();
			_this.set('googlePlace', googlePlace);
		};

		// does the callback really need to be wrapped in a function?
		google.maps.event.addListener(autocomplete, 'place_changed', function () { callback(); });
	}.on('didInsertElement'),

	placeChange: function () {
		this.sendAction('action', this.get('googlePlace'));
	}.observes('googlePlace')

});
