ig.module(
    'game.entities.player'
)
.requires(
    'impact.entity'
)
.defines(function () {
    EntityPlayer = ig.Entity.extend({

        size: {x: 64, y: 64},
        collides: ig.Entity.COLLIDES.ACTIVE,

        animSheet: new ig.AnimationSheet('media/hero.png', 64, 64),

        init: function (x, y, settings) {
            // Add animations for the animation sheet
            this.addAnim('idle', 0.1, [0]);
            this.addAnim('walkDown', 0.1, [0, 1, 2, 3, 4, 5, 6, 7]);
            this.addAnim('walkUp', 0.1, [8, 9, 10, 11, 12, 13, 14, 15]);
            this.addAnim('walkRight', 0.1, [16, 17, 18, 19, 20, 21, 22, 23]);
            this.addAnim('walkLeft', 0.1, [24, 25, 26, 27, 28, 29, 30, 31]);

            // Call the parent constructor
            this.parent(x, y, settings);
        },

        update: function () {
            if (ig.input.state('up')) {
                this.currentAnim = this.anims.walkUp;
                this.vel.x = 0;
                this.vel.y = -100;
            } else if (ig.input.state('down')) {
                this.currentAnim = this.anims.walkDown;
                this.vel.x = 0;
                this.vel.y = 100;
            } else if (ig.input.state('right')) {
                this.currentAnim = this.anims.walkRight;
                this.vel.x = 100;
                this.vel.y = 0;
            } else if (ig.input.state('left')) {
                this.currentAnim = this.anims.walkLeft;
                this.vel.x = -100;
                this.vel.y = 0;
            } else {
                this.currentAnim = this.anims.idle;
                this.vel.x = 0;
                this.vel.y = 0;
            }

            this.parent();
        }
    });
});