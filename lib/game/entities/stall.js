//@ sourceMappingURL=stall.map
/*;
var EntityStall;

EntityStall = {};

*/;

ig.module('game.entities.stall').requires('plusplus.core.entity').defines(function() {
  return EntityStall = ig.EntityExtended.extend({
    size: {
      x: 128,
      y: 60
    },
    offset: {
      x: 0,
      y: 20
    },
    animSheet: new ig.AnimationSheet('media/buildings/stall.png', 128, 80),
    animSettings: {
      idle: {
        sequence: [0],
        frameTime: 1
      }
    },
    collides: ig.Entity.COLLIDES.FIXED,
    trader: null,
    init: function(x, y, settings) {
      var trader;

      this.parent(x, y, settings);
      trader = ig.game.getEntityByName(this.trader);
      return this.trader = trader != null ? trader : null;
    }
  });
});
