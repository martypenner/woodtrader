ig.module(
    'game.entities.player'
)
.requires(
    'game.entities.common.base-entity',
    'game.entities.inventory',
    'game.entities.weapons.axe'
)
.defines(function () {

EntityPlayer = EntityBaseEntity.extend({

    size: {x: 10, y: 13},
    offset: {x: 2, y: 6},
    collides: ig.Entity.COLLIDES.ACTIVE,
    type: ig.Entity.TYPE.A,
    animSheet: new ig.AnimationSheet('media/characters/hero_v2.png', 14, 19),

    name: 'player',

    // The possible states this entity can be in
    states: {DEFAULT: 1, IN_INVENTORY: 2},

    // The current state for this entity
    state: null,

    // Last direction the player was facing, so the correct idle animation is shown
    facing: 'Down',

    // Default moving velocity
    velocity: 150,

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
        this.addAnim('idleUp', this.idleAnimSpeed, [3]);
        this.addAnim('idleRight', this.idleAnimSpeed, [6]);
        this.addAnim('idleLeft', this.idleAnimSpeed, [9]);
        this.addAnim('walkDown', this.movingAnimSpeed, [0, 1, 0, 2]);
        this.addAnim('walkUp', this.movingAnimSpeed, [3, 4, 3, 5]);
        this.addAnim('walkRight', this.movingAnimSpeed, [6, 7, 6, 8]);
        this.addAnim('walkLeft', this.movingAnimSpeed, [9, 10, 9, 11]);

        // Set the entity's default state
        this.state = this.states.DEFAULT;

        // Spawn the inventory at 0, 0 and store it, but only if we're not in Weltmeister
        if (!ig.global.wm) {
            this.inventory = ig.game.spawnEntity(EntityInventory);

            // Set inventory position to the center of the screen
            this.inventory.pos.x = (ig.system.width - this.inventory.size.x) / 2;
            this.inventory.pos.y = (ig.system.height - this.inventory.size.y) / 2;
        }

        // Call the parent constructor
        this.parent(x, y, settings);

        // Store the player entity globally for performance and ease of reference
        ig.game.player = this;
    },

    update: function () {
        // Check for button presses and activate the appropriate animation
        this.handleButtons();

        // Call the parent to get physics and movement updates
        this.parent();
    },

    draw: function () {
        // If not in Weltmeister, make the player move behind or in front of nearby entities
        // based on the position of its bottom corner
        if (!ig.global.wm) {
            this.zIndex = parseInt(this.pos.y + this.size.y);
            ig.game.sortEntitiesDeferred();
        }

        // Set the inventory's visibility based on whether we're in Weltmeister and the
        // player is trying to access the inventory
        if (!ig.global.wm) {
            this.inventory.isVisible = ig.gui.show = this.state === this.states.IN_INVENTORY;
        }

        this.parent();
    },

    handleButtons: function () {
        /*** Inventory/Menu Navigation ***/

        if (ig.input.pressed('inventory')) {
            // Cancel all movement and animation
            this.currentAnim = this.anims['idle' + this.facing];
            this.vel.x = 0;
            this.vel.y = 0;

            // If we're already in the inventory menu, close the menu
            if (this.state === this.states.IN_INVENTORY) {
                this.movementAllowed = true;
                this.state = this.states.DEFAULT;
            // Otherwise, bring up the inventory menu
            } else {
                this.movementAllowed = false;
                this.state = this.states.IN_INVENTORY;
            }
        }

        // If trying to access inventory, use the keys to navigate the menu
        if (this.state === this.states.IN_INVENTORY) {
            // Check for keypresses to navigate
        }

        // Don't move the player if he's not allowed to (e.g. we're in a menu)
        if (!this.movementAllowed) {
            return;
        }

        /*** Weapons ***/

        if (ig.input.pressed('attack')) {
            var axe = ig.game.spawnEntity('EntityAxe');
            axe.pos = this.getWeaponCoordinates(axe);
        }

        /*** Movement ***/

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
    },

    getWeaponCoordinates: function (weaponEntity) {
        var pos = {x: 0, y: 0};

        switch (this.facing) {
            case 'Up':
                pos.x = this.pos.x;
                pos.y = this.pos.y - weaponEntity.size.y;
                break;
            case 'Down':
                pos.x = this.pos.x;
                pos.y = this.pos.y + this.size.y;
                break;
            case 'Left':
                pos.x = this.pos.x - weaponEntity.size.x;
                pos.y = this.pos.y;
                break;
            case 'Right':
                pos.x = this.pos.x + this.size.x;
                pos.y = this.pos.y;
                break;
        }

        return pos;
    }
});

});