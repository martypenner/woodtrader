(function() {
  /*;
  var EntityMenuTrigger;

  EntityMenuTrigger = {};

  */;

  ig.module('game.entities.menu-trigger').requires('game.entities.common.trigger').defines(function() {
    return EntityMenuTrigger = EntityTrigger.extend({
      wait: 0.2,
      check: function(other) {
        return this.parent(other, 'showMenu');
      }
    });
  });

}).call(this);
