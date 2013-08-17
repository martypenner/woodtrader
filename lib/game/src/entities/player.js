ig.module(
    'game.entities.player'
)
.requires(
    'plusplus.abstractities.player',
    'game.entities.abilities.fireball-caster',
    'game.entities.abilities.axe',
    'game.entities.inventory',
    'game.common.weapon-manager'
)
.defines(function () {
    EntityPlayer = ig.Player.extend({
        size: {
            x: 16,
            y: 20
        },
        offset: {
            x: 17,
            y: 22
        },
        collides: ig.Entity.COLLIDES.ACTIVE,
        type: ig.Entity.TYPE.A,
        animSheet: new ig.AnimationSheet(ig.CONFIG.PATH_TO_CHARACTERS + 'player_v1.png', 50, 50),
        animFrameTime: 0.1,
        animInit: 'idleDown',
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
            moveDown: {
                sequence: [0, 1, 0, 2]
            },
            moveUp: {
                sequence: [7, 8, 7, 9]
            },
            moveRight: {
                sequence: [14, 15, 14, 16]
            },
            moveLeft: {
                sequence: [21, 22, 21, 23]
            },
            meleeDown: {
                sequence: [3]
            },
            meleeUp: {
                sequence: [4]
            },
            meleeRight: {
                sequence: [5]
            },
            meleeLeft: {
                sequence: [6]
            },
            shootDown: {
                sequence: [10]
            },
            shootUp: {
                sequence: [11]
            },
            shootRight: {
                sequence: [12]
            },
            shootLeft: {
                sequence: [13]
            }
        },

        // The possible states this entity can be in
        states: {
            DEFAULT: 1,
            IN_INVENTORY: 2
        },

        // The current state for this entity
        state: null,

        maxVelGrounded: {
            x: 250,
            y: 250
        },
        speed: {
            x: 10000,
            y: 10000
        },

        // Whether the entity is allowed to move
        movementAllowed: true,

        // Store the inventory entity for the player
        inventory: null,

        // Health and MAGIC!!!
        health: 50,
        energy: 50,
        energyMax: 50,
        regenHealth: false,
        regen: true,
        regenRateEnergy: 1,
        regenDelay: 0.8,
        persistent: true,

        activeWeapon: null,
        activeWeaponIndex: 0,
        weapons: [
            'axe',
            'fireball'
        ],

        // Properties to save between levels
        persistedProperties: [
            'health',
            'mana',
            'manaRegenerateDelayTimer',
            'weaponManager',
            'inventory'
        ],

        initProperties: function () {
            this.parent();

            // Set the entity's default state
            this.state = this.states.DEFAULT;

            // Spawn the inventory at 0, 0 and store it, but only if we're not in Weltmeister
            if (!ig.global.wm) {
                this.inventory = ig.game.spawnEntity(EntityInventory);

                // Set inventory position to the center of the screen
                this.inventory.pos.x = (ig.system.width - this.inventory.size.x) / 2;
                this.inventory.pos.y = (ig.system.height - this.inventory.size.y) / 2;
            }

            // Store the player entity globally for performance and ease of reference
            ig.global.player = this;

            // Shoot fireballs and swing axes like a pro
            this.axe = new ig.EntityAxe(this);
            this.fireball = new ig.FireballCaster(this);
            this.activeWeapon = this[this.weapons[this.activeWeaponIndex]];

            this.abilities.addDescendants([this.fireball, this.axe]);
        },

        spawn: function () {
            this.parent();

            // Face right
            this.facing = {x: 1, y: 0};
        },

        updateChanges: function () {
            this.parent();

            // Check for button presses and activate the appropriate animation
            this.handleButtons();
        },

        draw: function () {
            if (!ig.global.wm) {
                // Set the inventory's visibility based on whether we're in Weltmeister and the
                // player is trying to access the inventory
                this.inventory.isVisible = this.state == this.states.IN_INVENTORY;
            }

            this.parent();
        },

        handleButtons: function () {
            // Don't move the player if he's not allowed to (e.g. we're in a menu)
            if (!this.movementAllowed) {
                return;
            }

            if (ig.input.pressed('switchWeapon')) {
                this.activeWeaponIndex++;
                if (!this.weapons[this.activeWeaponIndex]) {
                    this.activeWeaponIndex = !this.weapons[this.activeWeaponIndex] ? 0 : this.activeWeaponIndex;
                }

                this.activeWeapon = this[this.weapons[this.activeWeaponIndex]];
            }

            if (ig.input.pressed('attack')) {
                var shootX, shootY;

                if (this.facing.x !== 0) {
                    if (this.facing.x > 0) {
                        shootX = this.pos.x + this.size.x;
                    } else {
                        shootX = this.pos.x;
                    }
                } else {
                    shootX = this.pos.x + this.size.x * 0.5;
                }

                if (this.facing.y !== 0) {
                    if (this.facing.y > 0) {
                        shootY = this.pos.y + this.size.y;
                    } else {
                        shootY = this.pos.y;
                    }
                } else {
                    shootY = this.pos.y + this.size.y * 0.5;
                }

                this.activeWeapon.execute({x: shootX, y: shootY});
            }

            /** Inventory/Menu Navigation **/

            if (ig.input.pressed('inventory')) {
                // If we're already in the inventory menu, close the menu
                if (this.state == this.states.IN_INVENTORY) {
                    this.movementAllowed = true;
                    this.state = this.states.DEFAULT;
                }
                // Otherwise, bring up the inventory menu
                else {
                    this.movementAllowed = false;
                    this.state = this.states.IN_INVENTORY;
                }

            // If trying to access inventory, use the keys to navigate the menu
            //if @state == @states.IN_INVENTORY
                // Check for keypresses to navigate
            }
        }
    });
});