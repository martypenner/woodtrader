// Generated by CoffeeScript 1.4.0
(function() {
  /*;

  var EntityLoadLevelTrigger;

  EntityLoadLevelTrigger = {};

  */;


  ig.module('game.entities.load-level-trigger').requires('game.entities.common.trigger').defines(function() {
    return EntityLoadLevelTrigger = EntityTrigger.extend({
      ignoreFirstHit: false,
      hitCount: 0,
      check: function(other) {
        this.hitCount++;
        if ((this.ignoreFirstHit && this.hitCount === 2) || !this.ignoreFirstHit) {
          return this.parent(other, 'loadLevel');
        }
      }
    });
  });

}).call(this);