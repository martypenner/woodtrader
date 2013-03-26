//@ sourceMappingURL=inventory-item.map
/*;
var EntityInventoryItem;

EntityInventoryItem = {};

*/;

ig.module('game.entities.inventory-item').requires('game.entities.common.static-entity').defines(function() {
  return EntityInventoryItem = EntityStaticEntity.extend({
    size: {
      x: 250,
      y: 50
    },
    animSheet: new ig.AnimationSheet('media/menus/menu-item.png', 250, 50),
    collides: ig.Entity.COLLIDES.NEVER,
    zIndex: 101,
    frame: 0,
    isVisible: false,
    draw: function() {
      if (this.isVisible) {
        return this.parent();
      }
    }
  });
});
