ig.module(
    'game.entities.menu'
)
.requires(
    'plusplus.core.entity'
)
.defines(function () {
    EntityMenu = ig.EntityExtended.extend({
        size: {
            x: 128,
            y: 80
        },
        collides: ig.Entity.COLLIDES.NEVER,

        animSheet: new ig.AnimationSheet('media/buildings/stall.png', 128, 80),

        // Whether the menu should be shown on the next draw
        isVisible: false,

        init: function (x, y, settings) {
            this.addAnim('idle', 1, [0]);
            this.parent(x, y, settings);
        },

        draw: function () {
            if (this.isVisible) {
                ig.game.font.draw('Beluga whales go fishing in the deep blue see?', 100, 100);
            }

            this.parent();
        },

        // Show menu if the player triggered it
        showMenuTrigger: function (other, trigger) {
            if (other.name == 'player') {
                this.isVisible = true;
            }
        },

        // Hide menu if the player triggered it
        hideMenuTrigger: function (other, trigger) {
            if (other.name == 'player') {
                this.isVisible = false;
            }
        }
    });
});
