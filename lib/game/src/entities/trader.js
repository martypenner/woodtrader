ig.module(
    'game.entities.trader'
)
.requires(
    'plusplus.core.entity',
    'game.entities.inventory',
    'game.entities.dialog'
)
.defines(function () {
    EntityTrader = ig.EntityExtended.extend({
        size: {
            x: 29,
            y: 35
        },
        offset: {
            x: 10,
            y: 28
        },
        collides: ig.Entity.COLLIDES.FIXED,
        type: ig.Entity.TYPE.A,
        animSheet: new ig.AnimationSheet(ig.CONFIG.PATH_TO_CHARACTERS + 'media/characters/trader.png', 48, 64),
        animSettings: {
            idleDown: {
                sequence: [0],
                frameTime: 1
            },
            idleUp: {
                sequence: [7],
                frameTime: 1
            },
            idleRight: {
                sequence: [14],
                frameTime: 1
            },
            idleLeft: {
                sequence: [21],
                frameTime: 1
            },
            walkDown: {
                sequence: [0, 1, 0, 2],
                frameTime: 0.1
            },
            walkUp: {
                sequence: [7, 8, 7, 9],
                frameTime: 0.1
            },
            walkRight: {
                sequence: [14, 15, 14, 16],
                frameTime: 0.1
            },
            walkLeft: {
                sequence: [21, 22, 21, 23],
                frameTime: 0.1
            }
        },

        bubble: new ig.Image('media/dialogs/ellipsis.png'),
        bubbleRelativePos: {
            x: -2,
            y: -43
        },
        playerIsNear: false,

        dialogs: [],
        dialogVisible: false,
        dialogRelativePos: {
            x: -2,
            y: -100
        },

        // The possible states this entity can be in
        states: {
            DEFAULT: 1,
            IN_INVENTORY: 2
        },

        // The current state for this entity
        state: null,

        // Last direction the player was facing, so the correct idle animation is shown
        facing: 'Down',

        // Default moving velocity
        velocity: 200,

        // Maximum velocity
        maxVel: {
            x: 500,
            y: 500
        },

        idleAnimSpeed: 1,
        movingAnimSpeed: 0.06,

        // Whether the entity is allowed to move
        movementAllowed: true,

        // Store the inventory entity
        inventory: null,

        init: function (x, y, settings) {
            // Set the entity's default state
            this.state = this.states.DEFAULT;

            // Spawn the inventory at 0, 0 and store it, but only if we're not in Weltmeister
            if (!ig.global.wm) {
                this.inventory = ig.game.spawnEntity(EntityInventory);

                // Set inventory position to the center of the screen
                this.inventory.pos.x = (ig.system.width - this.inventory.size.x) / 2;
                this.inventory.pos.y = (ig.system.height - this.inventory.size.y) / 2;

                // Spawn the dialogs
                var dialog = ig.game.spawnEntity(
                    EntityDialog,
                    this.pos.x + this.dialogRelativePos.x,
                    this.pos.y + this.dialogRelativePos.y,
                    {text: ["I enjoy purchasing\nvarious species of\ntrees!"]}
                );
                this.dialogs.push(dialog);
            }

            // Call the parent constructor
            this.parent(x, y, settings);
        },

        update: function () {
            this.playerIsNear = this.distanceTo(ig.global.player) < 110;

            this.parent();
        },

        draw: function () {
            // Set the inventory's visibility based on whether we're in Weltmeister and the
            // player is trying to access the inventory
            if (!ig.global.wm) {
                this.inventory.isVisible = this.state == this.states.IN_INVENTORY;
            }

            if (ig.input.pressed('confirm') && this.playerIsNear) {
                this.dialogVisible = this.playerIsNear && !this.dialogVisible;
                ig.global.player.movementAllowed = !this.dialogVisible;
            }

            if (this.playerIsNear) {
                if (this.dialogVisible) {
                    // Update the dialog position according to the trader position and screen offset
                    this.dialogs[0].visible = true;
                    this.dialogs[0].pos = {
                        x: this.pos.x - ig.game.screen.x + this.dialogRelativePos.x,
                        y: this.pos.y - ig.game.screen.y + this.dialogRelativePos.y
                    };
                } else {
                    this.dialogs[0].visible = false;
                    this.bubble.draw(
                        this.pos.x - ig.game.screen.x + this.bubbleRelativePos.x,
                        this.pos.y - ig.game.screen.y + this.bubbleRelativePos.y
                    );
                }
            }

            this.parent();
        }
    });
});
