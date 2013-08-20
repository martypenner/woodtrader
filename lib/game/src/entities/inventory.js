ig.module(
    'game.entities.inventory'
)
.requires(
    'plusplus.core.entity'
)
.defines(function () {
    EntityInventory = ig.EntityExtended.extend({
        size: {
            x: 320,
            y: 200
        },
        collides: ig.Entity.COLLIDES.NEVER,

        // Store of the inventory items
        items: {},

        addItem: function (item) {
            this.items[item] = this.items[item] || 0;
            this.items[item] += 1;
        },

        removeItem: function (item) {
            this.items[item] = 0;
        },

        increaseItem: function (item) {
            this.items[item] = this.items[item] || 0;
            this.items[item] += 1;
        },

        decreaseItem: function (item) {
            this.items[item] = this.items[item] || 0;
            this.items[item] -= 1;
            this.items[item] = this.items[item] == -1 ? 0 : this.items[item];
        },

        getCount: function (item) {
            this.items[item] = this.items[item] || 0;
        }
    });
});
