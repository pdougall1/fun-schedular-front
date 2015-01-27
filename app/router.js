import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
	this.resource('sessions', { path: 'login' });
	this.resource('events', function () {
		this.route('show', { path: 'events/:event_id' });
	});
	this.resource('calendars', { path: '/' }, function () {
		this.resource('events', function () {
			this.resource('create', function () {
				this.route('details');
				this.route('time');
				this.route('location');
				this.route('people');
			});
		});
	});
	this.resource('users', { path: '/people' }, function () {
		this.route('show', { path: '/me' });
		this.route('index', { path: '/following' });
	});
});

export default Router;
