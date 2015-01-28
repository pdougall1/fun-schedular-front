import DS from 'ember-data';

export default DS.Model.extend({

  latitude: DS.attr('number'),
  longitude: DS.attr('number'),
  name: DS.attr('string'),
  googlePlaceId: DS.attr('string'),
  address: DS.attr('string'),
  event: DS.belongsTo('event')
  
});
