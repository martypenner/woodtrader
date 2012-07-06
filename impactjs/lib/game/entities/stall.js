ig.module(
    'game.entities.stall'
)
.requires(
    'impact.entity'
)
.defines(function () {

EntityStall = ig.Entity.extend({
    size: {x: 128, y: 80},
    collides: ig.Entity.COLLIDES.FIXED,

    animSheet: new ig.AnimationSheet('media/stall.png', 128, 80),

    // Whether the menu should be shown on the next draw
    menuVisible: false,
    menuTimer: null,

    init: function (x, y, settings) {
        this.addAnim('idle', 1, [0]);

        this.parent(x, y, settings);
    },

    update: function () {
        if (this.menuVisible) {
        }

        this.parent();
    },

    draw: function () {
        if (this.menuVisible) {
            ig.game.font.draw('Beluga whales go fishing in the deep blue see?', 100, 100);
        }

        this.parent();
    },

    // Show menu if the player triggered it
    showMenuTrigger: function (other, trigger) {
        if (other.name == 'player') {
            this.menuVisible = true;
        }
    }
});

});
