(function() {
  /*;
  var EntityMenuHideTrigger;

  EntityMenuHideTrigger = {};

  */;

  ig.module('game.entities.menu-hide-trigger').requires('game.entities.menu-trigger').defines(function() {
    return EntityMenuHideTrigger = EntityTrigger.extend({
      wait: 0.2,
      check: function(other) {
        return this.parent(other, 'hideMenu');
      }
    });
  });

}).call(this);
