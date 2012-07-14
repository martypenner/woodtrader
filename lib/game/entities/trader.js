ig.module(
    'game.entities.trader'
)
.requires(
    'game.entities.static-entity',
    'game.entities.inventory'
)
.defines(function () {

EntityTrader = EntityStaticEntity.extend({

    size: {x: 29, y: 35},
    offset: {x: 10, y: 28},
    collides: ig.Entity.COLLIDES.NEVER,
    type: ig.Entity.TYPE.A,
    animSheet: new ig.AnimationSheet('media/characters/trader.png', 48, 64),

    bubble: new ig.Image('media/dialogs/ellipsis.png'),
    bubbleVisible: false,

    // The possible states this entity can be in
    states: {DEFAULT: 1, IN_INVENTORY: 2},

    // The current state for this entity
    state: null,

    // Ensure the player gets drawn near last (over most other entities)
    zIndex: 5,

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

    // Store the inventory entity for the player
    inventory: null,

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

        // Set the entity's default state
        this.state = this.states.DEFAULT;

        // Spawn the inventory at 0, 0 and store it, but only if we're not in Weltmeister
        if (!ig.global.wm) {
            this.inventory = ig.game.spawnEntity(EntityInventory);

            // Set inventory position to the center of the screen
            this.inventory.pos.x = (ig.system.canvas.width - this.inventory.size.x) / 2;
            this.inventory.pos.y = (ig.system.canvas.height - this.inventory.size.y) / 2;
        }

        // Call the parent constructor
        this.parent(x, y, settings);
    },

    draw: function () {
        // Set the inventory's visibility based on whether we're in Weltmeister and the
        // player is trying to access the inventory
        if (!ig.global.wm) {
            this.inventory.isVisible = ig.gui.show = this.state === this.states.IN_INVENTORY;
        }

        if (this.bubbleVisible) {
            this.bubble.draw(this.pos.x - 2, this.pos.y - 43);
        }

        this.parent();
    }
});

});