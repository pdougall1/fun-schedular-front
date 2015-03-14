import DS from 'ember-data';

export default DS.Model.extend({
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  email: DS.attr('string'),
  user: DS.belongsTo('friend'),
  events: DS.hasMany('event'),

  fullName: function () {
    return this.get('firstName') + " " + this.get('lastName');
  }.property('firstName', 'lastName'),

  color: function () {
    var colors = this.get('colors');
    var id = this.get('id');

    var findNum = function (num) {
      if (num > (colors.length)) {
        return findNum(num - colors.length - 1);
      } else {
        return num;
      }
    }
    return colors[findNum(id + 1)] || 'gray';
  }.property(),

  colors: ['brownmadder', 'maroon', 'orangered4', 
    'tomato4', 'coral1', 'chocolate', 'cadmiumorange', 
    'ochre', 'mustard', 'brightgold', 'goldgreen', 
    'pea', 'chartreuse3', 'blue', 'deepskyblue2', 
    'aquamarine', 'sgilight']

});
