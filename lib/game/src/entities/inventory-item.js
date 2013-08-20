ig.module(
    'game.entities.inventory-item'
)
.requires(
    'plusplus.core.entity'
)
.defines(function () {
    EntityInventoryItem = ig.EntityExtended.extend({
        size: {
            x: 250,
            y: 50
        },
        animSheet: new ig.AnimationSheet('media/menus/menu-item.png', 250, 50),
        collides: ig.Entity.COLLIDES.NEVER,

        // Ensure the item gets drawn over everything else
        zIndex: 101,

        isVisible: false,

        init: function (x, y, settings) {
            this.addAnim('idle', 1, [0]);
            this.parent(x, y, settings);
        },

        draw: function () {
            if (this.isVisible) {
                this.parent();
            }
        }
    });
});
