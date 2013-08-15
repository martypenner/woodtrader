//@ sourceMappingURL=inventory-item.map
/*;
var EntityInventoryItem;

EntityInventoryItem = {};

*/;

ig.module('game.entities.inventory-item').requires('game.entities.common.static-entity').defines(function() {
  return EntityInventoryItem = EntityBaseEntity.extend({
    size: {
      x: 250,
      y: 50
    },
    animSheet: new ig.AnimationSheet('media/menus/menu-item.png', 250, 50),
    collides: ig.Entity.COLLIDES.NEVER,
    zIndex: 101,
    isVisible: false,
    init: function(x, y, settings) {
      this.addAnim('idle', 1, [0]);
      return this.parent(x, y, settings);
    },
    draw: function() {
      if (this.isVisible) {
        return this.parent();
      }
    }
  });
});
