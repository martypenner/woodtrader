ig.module(
    'game.entities.inventory'
)
.requires(
    'game.entities.static-entity'
)
.defines(function () {

EntityInventory = EntityStaticEntity.extend({

    size: {x: 128, y: 80},
    animSheet: new ig.AnimationSheet('media/stall.png', 128, 80),
    collides: ig.Entity.COLLIDES.NEVER,

    name: 'inventory',

    // Ensure the inventory gets drawn over everything else
    zIndex: 10000,

    draw: function () {
        if (this.isVisible) {
            this.parent();
        }
    }
});

});