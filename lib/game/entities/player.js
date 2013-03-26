//@ sourceMappingURL=player.map
(function() {
  /*;
  var EntityPlayer;

  EntityPlayer = {};

  */;

  ig.module('game.entities.player').requires('game.entities.common.base-entity', 'game.entities.inventory').defines(function() {
    return EntityPlayer = EntityBaseEntity.extend({
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
      animSheet: new ig.AnimationSheet('media/characters/player_v1.png', 50, 50),
      name: 'player',
      states: {
        DEFAULT: 1,
        IN_INVENTORY: 2
      },
      state: null,
      facing: 'Down',
      velocity: 300,
      maxVel: {
        x: 500,
        y: 500
      },
      idleAnimSpeed: 1,
      movingAnimSpeed: 0.1,
      movementAllowed: true,
      inventory: null,
      canUseWeapons: true,
      weaponManager: null,
      health: 50,
      mana: 50,
      maxMana: 50,
      manaRegenerateDelay: 3,
      manaRegenerateRate: 1,
      persistedProperties: ['health', 'mana', 'manaRegenerateDelayTimer', 'weaponManager', 'inventory'],
      init: function(x, y, settings) {
        this.addAnim('idleDown', this.idleAnimSpeed, [0]);
        this.addAnim('idleUp', this.idleAnimSpeed, [7]);
        this.addAnim('idleRight', this.idleAnimSpeed, [14]);
        this.addAnim('idleLeft', this.idleAnimSpeed, [21]);
        this.addAnim('walkDown', this.movingAnimSpeed, [0, 1, 0, 2]);
        this.addAnim('walkUp', this.movingAnimSpeed, [7, 8, 7, 9]);
        this.addAnim('walkRight', this.movingAnimSpeed, [14, 15, 14, 16]);
        this.addAnim('walkLeft', this.movingAnimSpeed, [21, 22, 21, 23]);
        this.addAnim('axeDown', this.movingAnimSpeed, [3]);
        this.addAnim('axeUp', this.movingAnimSpeed, [4]);
        this.addAnim('axeRight', this.movingAnimSpeed, [5]);
        this.addAnim('axeLeft', this.movingAnimSpeed, [6]);
        this.addAnim('fireballDown', this.movingAnimSpeed, [10]);
        this.addAnim('fireballUp', this.movingAnimSpeed, [11]);
        this.addAnim('fireballRight', this.movingAnimSpeed, [12]);
        this.addAnim('fireballLeft', this.movingAnimSpeed, [13]);
        this.state = this.states.DEFAULT;
        if (!ig.global.wm) {
          this.inventory = ig.game.spawnEntity(EntityInventory);
          this.inventory.pos.x = (ig.system.width - this.inventory.size.x) / 2;
          this.inventory.pos.y = (ig.system.height - this.inventory.size.y) / 2;
        }
        this.parent(x, y, settings);
        return ig.game.player = this;
      },
      update: function() {
        this.handleButtons();
        return this.parent();
      },
      draw: function() {
        if (!ig.global.wm) {
          this.inventory.isVisible = this.state === this.states.IN_INVENTORY;
        }
        return this.parent();
      },
      handleButtons: function() {
        if (!this.movementAllowed) {
          this.reset();
          return;
        }
        /* Inventory/Menu Navigation
        */

        if (ig.input.pressed('inventory')) {
          this.reset();
          if (this.state === this.states.IN_INVENTORY) {
            this.movementAllowed = true;
            this.state = this.states.DEFAULT;
          } else {
            this.movementAllowed = false;
            this.state = this.states.IN_INVENTORY;
          }
        }
        /* Movement
        */

        if (ig.input.state('up')) {
          this.currentAnim = this.anims.walkUp;
          this.facing = 'Up';
          this.vel.x = 0;
          this.vel.y = -this.velocity;
          if (ig.input.state('right')) {
            return this.vel.x = this.velocity;
          } else if (ig.input.state('left')) {
            return this.vel.x = -this.velocity;
          }
        } else if (ig.input.state('down')) {
          this.currentAnim = this.anims.walkDown;
          this.facing = 'Down';
          this.vel.x = 0;
          this.vel.y = this.velocity;
          if (ig.input.state('right')) {
            return this.vel.x = this.velocity;
          } else if (ig.input.state('left')) {
            return this.vel.x = -this.velocity;
          }
        } else if (ig.input.state('left')) {
          this.currentAnim = this.anims.walkLeft;
          this.facing = 'Left';
          this.vel.x = -this.velocity;
          return this.vel.y = 0;
        } else if (ig.input.state('right')) {
          this.currentAnim = this.anims.walkRight;
          this.facing = 'Right';
          this.vel.x = this.velocity;
          return this.vel.y = 0;
        } else {
          if (!ig.input.pressed('attack')) {
            return this.reset();
          }
        }
      },
      reset: function() {
        this.currentAnim = this.anims['idle' + this.facing];
        this.vel.x = 0;
        return this.vel.y = 0;
      }
    });
  });

}).call(this);
