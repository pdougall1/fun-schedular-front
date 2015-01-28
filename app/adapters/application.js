import DS from 'ember-data';
import ENV from 'fun-schedular-front/config/environment';

export default DS.ActiveModelAdapter.extend({
	host: ENV.APP.FUN_SCHEDULAR_RAILS_DOMAIN
});
