ig.module(
    'game.entities.inventory-item'
)
.requires(
    'game.entities.static-entity'
)
.defines(function () {

EntityInventoryItem = EntityStaticEntity.extend({

    size: {x: 250, y: 50},
    animSheet: new ig.AnimationSheet('media/menu-item.png', 250, 50),
    collides: ig.Entity.COLLIDES.NEVER,

    // Ensure the item gets drawn over everything else
    zIndex: 10001,

    frame: 0,

    isVisible: false,

    draw: function () {
        if (this.isVisible) {
            this.parent();
        }
    }
});

});