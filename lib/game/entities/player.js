//@ sourceMappingURL=player.map
/*;
var EntityPlayer;

EntityPlayer = {};

*/;

ig.module('game.entities.player').requires('plusplus.abstractities.player', 'game.entities.abilities.fireball-caster', 'game.entities.abilities.axe', 'game.entities.inventory', 'game.common.weapon-manager').defines(function() {
  return EntityPlayer = ig.Player.extend({
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
      axeDown: {
        sequence: [3]
      },
      axeUp: {
        sequence: [4]
      },
      axeRight: {
        sequence: [5]
      },
      axeLeft: {
        sequence: [6]
      },
      fireballDown: {
        sequence: [10]
      },
      fireballUp: {
        sequence: [11]
      },
      fireballRight: {
        sequence: [12]
      },
      fireballLeft: {
        sequence: [13]
      }
    },
    states: {
      DEFAULT: 1,
      IN_INVENTORY: 2
    },
    state: null,
    maxVelGrounded: {
      x: 250,
      y: 250
    },
    speed: {
      x: 10000,
      y: 10000
    },
    movementAllowed: true,
    inventory: null,
    health: 50,
    energy: 50,
    energyMax: 50,
    regenHealth: false,
    regen: true,
    regenRateEnergy: 1,
    regenDelay: 0.8,
    persistent: true,
    persistedProperties: ['health', 'mana', 'manaRegenerateDelayTimer', 'weaponManager', 'inventory'],
    initProperties: function() {
      this.parent();
      this.state = this.states.DEFAULT;
      this.weaponManager = new WeaponManager({
        activeWeapon: 'axe',
        weapons: ['axe', 'fireball']
      });
      if (!ig.global.wm) {
        this.inventory = ig.game.spawnEntity(EntityInventory);
        this.inventory.pos.x = (ig.system.width - this.inventory.size.x) / 2;
        this.inventory.pos.y = (ig.system.height - this.inventory.size.y) / 2;
      }
      ig.global.player = this;
      this.fireball = new ig.FireballCaster(this);
      this.axe = new ig.EntityAxe(this);
      return this.abilities.addDescendants([this.fireball, this.axe]);
    },
    spawn: function() {
      this.parent();
      return this.facing = {
        x: 1,
        y: 0
      };
    },
    updateChanges: function() {
      this.parent();
      this.weaponManager.update();
      return this.handleButtons();
    },
    draw: function() {
      if (!ig.global.wm) {
        this.inventory.isVisible = this.state === this.states.IN_INVENTORY;
      }
      return this.parent();
    },
    handleButtons: function() {
      var shootX, shootY;

      if (!this.movementAllowed) {
        this.resetAnims();
        return;
      }
      if (ig.input.pressed('attack')) {
        if (this.facing.x !== 0) {
          shootX = this.facing.x > 0 ? this.pos.x + this.size.x : this.pos.x;
        } else {
          shootX = this.pos.x + this.size.x * 0.5;
        }
        if (this.facing.y !== 0) {
          shootY = this.facing.y > 0 ? this.pos.y + this.size.y : this.pos.y;
        } else {
          shootY = this.pos.y + this.size.y * 0.5;
        }
        this.fireball.execute({
          x: shootX,
          y: shootY
        });
      }
      /* Inventory/Menu Navigation
      */

      if (ig.input.pressed('inventory')) {
        this.resetAnims();
        if (this.state === this.states.IN_INVENTORY) {
          this.movementAllowed = true;
          return this.state = this.states.DEFAULT;
        } else {
          this.movementAllowed = false;
          return this.state = this.states.IN_INVENTORY;
        }
      }
    },
    resetAnims: function() {
      if (this.weaponManager.weaponIsActive()) {
        return this.weaponManager.reset();
      }
    }
  });
});
