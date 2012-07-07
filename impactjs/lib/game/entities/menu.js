ig.module(
    'game.entities.menu'
)
.requires(
    'game.entities.static-entity'
)
.defines(function () {

EntityMenu = EntityStaticEntity.extend({
//    _wmDrawBox: true,
//    _wmScalable: true,

    size: {x: 128, y: 80},
    collides: ig.Entity.COLLIDES.NEVER,

    animSheet: new ig.AnimationSheet('media/stall.png', 128, 80),

    // Whether the menu should be shown on the next draw
    isVisible: false,
    timer: null,

    update: function () {
        // Hide the menu if it's visible, the player has stepped away
        // from the stall, and more than 0.2 seconds has elapsed
        if (this.isVisible) {
            if (this.timer.delta() > (ig.system.tick * 10)) {
                this.timer.reset();
                this.isVisible = false;
            }
        }

        this.parent();
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

            if (null === this.timer) {
                this.timer = new ig.Timer();
            }

            this.timer.reset();
        }
    }
});

});
