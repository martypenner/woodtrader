(function() {
  /*;
  var EntityStall;

  EntityStall = {};

  */;

  ig.module('game.entities.stall').requires('game.entities.common.static-entity').defines(function() {
    return EntityStall = EntityStaticEntity.extend({
      size: {
        x: 128,
        y: 60
      },
      offset: {
        x: 0,
        y: 20
      },
      animSheet: new ig.AnimationSheet('media/buildings/stall.png', 128, 80),
      trader: null,
      init: function(x, y, settings) {
        var trader;

        this.parent(x, y, settings);
        trader = ig.game.getEntityByName(this.trader);
        return this.trader = trader != null ? trader : null;
      }
    });
  });

}).call(this);
