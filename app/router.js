import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
	this.resource('events', function () {
		this.route('show', { path: 'events/:event_id' });
	});
	this.resource('calendars', { path: '/' }, function () {
		this.resource('events', function () {
			this.route('create');
		});
	});
	this.resource('users', { path: '/people' }, function () {
		this.route('show', { path: '/me' });
		this.route('index', { path: '/following' });
	});
  this.route('calendar');
});

export default Router;
