ig.module(
    'game.entities.weapons.axe'
)
.requires(
    'impact.entity'
)
.defines(function () {

EntityAxe = ig.Entity.extend({

    size: {x: 16, y: 16},
    collides: ig.Entity.COLLIDES.NEVER,
    type: ig.Entity.TYPE.B,
    checkAgainst: ig.Entity.TYPE.A,

    swingAxe: new ig.Sound('media/sounds/axe-hit.*'),

    lifeTimer: null,

    init: function (x, y, settings) {
        this.lifeTimer = new ig.Timer();

        this.swingAxe.play();

        // Call the parent constructor
        this.parent(x, y, settings);
    },

    update: function () {
        if (this.lifeTimer.delta() > 0.2) {
            this.kill();
        }

        this.parent();
    },

    check: function (other) {
        if (other.entityType == 'tree') {
            other.chopDown();
            this.kill();
        }
    }

});

});