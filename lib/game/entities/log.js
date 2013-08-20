ig.module(
    'game.entities.log'
)
.requires(
    'plusplus.abstractities.particle',
    'game.common.flasher'
)
.defines(function () {
    EntityLog = ig.Particle.extend({
        size: {
            x: 25,
            y: 25
        },
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.NEVER,
        animSheet: new ig.AnimationSheet('media/environment/log.png', 36, 25),
        animSettings: {
            idle: {
                frameTime: 0.2,
                sequence: [0, 1, 2, 3, 2, 1, 0]
            }
        },

        // Preload sounds
        pickup: new ig.Sound(ig.CONFIG.PATH_TO_SOUNDS + 'pickup.*'),

        lifeDuration: 10,
        fadeBeforeDeathDuration: 3,

        // Pickup the log if the player runs into it
        // TODO: should probably be replaced with something like AbiltityPickUp
        check: function (other) {
            if (other.name == 'player') {
                this.pickup.play();
                other.inventory.addItem('log');
                this.kill();
            }
        }
    });
});