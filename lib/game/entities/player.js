ig.module(
    'game.entities.player'
)
.requires(
    'impact.entity'
)
.defines(function () {

EntityPlayer = ig.Entity.extend({

    size: {x: 29, y: 35},
    offset: {x: 10, y: 28},

    name: 'player',

    collides: ig.Entity.COLLIDES.ACTIVE,
    type: ig.Entity.TYPE.A,

    // Ensure the player gets drawn near last (over most other entities)
    zIndex: 1000,

    animSheet: new ig.AnimationSheet('media/hero.png', 48, 64),

    // Last direction the player was facing, so the correct idle animation is shown
    facing: 'Down',

    // Default moving velocity
    velocity: 200,

    // Maximum velocity
    maxVel: {x: 500, y: 500},

    idleAnimSpeed: 1,
    movingAnimSpeed: 0.06,

    // Whether the entity is allowed to move
    movementAllowed: true,

    init: function (x, y, settings) {
        // Add animations for the animation sheet
        this.addAnim('idleDown', this.idleAnimSpeed, [0]);
        this.addAnim('idleUp', this.idleAnimSpeed, [8]);
        this.addAnim('idleRight', this.idleAnimSpeed, [16]);
        this.addAnim('idleLeft', this.idleAnimSpeed, [24]);
        this.addAnim('walkDown', this.movingAnimSpeed, [0, 1, 2, 3, 4, 5, 6, 7]);
        this.addAnim('walkUp', this.movingAnimSpeed, [8, 9, 10, 11, 12, 13, 14, 15]);
        this.addAnim('walkRight', this.movingAnimSpeed, [16, 17, 18, 19, 20, 21, 22, 23]);
        this.addAnim('walkLeft', this.movingAnimSpeed, [24, 25, 26, 27, 28, 29, 30, 31]);

        // Call the parent constructor
        this.parent(x, y, settings);
    },

    update: function () {
        // Check for button presses and activate the appropriate animation
        this.handleButtons();

        // Call the parent to get physics and movement updates
        this.parent();
    },

    handleButtons: function () {
        // Don't move the player if he's not allowed to (e.g. we're in a menu)
        if (!this.movementAllowed) {
            return;
        }

        // If moving sideways, change the hit box dimensions and offset
        if (ig.input.state('up')) {
            this.currentAnim = this.anims.walkUp;
            this.facing = 'Up';
            this.vel.x = 0;
            this.vel.y = -this.velocity;

            if (ig.input.state('right')) {
                this.vel.x = this.velocity;
            } else if (ig.input.state('left')) {
                this.vel.x = -this.velocity;
            }

        } else if (ig.input.state('down')) {
            this.currentAnim = this.anims.walkDown;
            this.facing = 'Down';
            this.vel.x = 0;
            this.vel.y = this.velocity;

            if (ig.input.state('right')) {
                this.vel.x = this.velocity;
            } else if (ig.input.state('left')) {
                this.vel.x = -this.velocity;
            }

        } else if (ig.input.state('left')) {
            this.currentAnim = this.anims.walkLeft;
            this.facing = 'Left';
            this.vel.x = -this.velocity;
            this.vel.y = 0;

        } else if (ig.input.state('right')) {
            this.currentAnim = this.anims.walkRight;
            this.facing = 'Right';
            this.vel.x = this.velocity;
            this.vel.y = 0;

        } else {
            // Stop all movement and show the correct idle animation for
            // the direction the player is facing
            this.currentAnim = this.anims['idle' + this.facing];
            this.vel.x = 0;
            this.vel.y = 0;
        }
    }
});

});