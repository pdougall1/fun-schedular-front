import DS from 'ember-data';
import config from '../config/environment';

export default DS.ActiveModelAdapter.extend({
	host: FunSchedularFront.FUN_SCHEDULAR_RAILS_DOMAIN
});
