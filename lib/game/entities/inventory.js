ig.module(
    'game.entities.inventory'
)
.requires(
    'game.entities.static-entity'
)
.defines(function () {

EntityInventory = EntityStaticEntity.extend({

    size: {x: 320, y: 200},
    animSheet: new ig.AnimationSheet('media/menus/menu.png', 320, 200),
    collides: ig.Entity.COLLIDES.NEVER,

    name: 'inventory',

    // Ensure the inventory gets drawn over everything else
    zIndex: 100,

    // Store of the inventory items
    items: ['umbrella', 'shoe'],

    isVisible: false,

    init: function (x, y, settings) {
        var oldItems = this.items;
        var newItems = [];

        for (var i = 0; i < oldItems.length; i++) {
            var newItem = ig.game.spawnEntity(EntityInventoryItem, 0, 0, {name: oldItems[i]});

            newItem.pos.x = (ig.system.canvas.width - newItem.size.x) / 2;
            newItem.pos.y = (ig.system.canvas.height - this.size.y) / 2 + (i * 70) + 20;

            newItems.push(newItem);
        }

        // Assign the actual entities to the items array
        this.items = newItems;

        this.parent(x, y, settings);
    },

    draw: function () {
        if (this.isVisible) {
            this.setItemsVisibility(true);

            this.parent();
        } else {
            this.setItemsVisibility(false);
        }
    },

    setItemsVisibility: function (visible) {
        for (var i = 0; i < this.items.length; i++) {
            this.items[i].isVisible = visible;
        }
    }
});

});