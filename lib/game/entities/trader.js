//@ sourceMappingURL=trader.map
(function() {
  /*;
  var EntityTrader;

  EntityTrader = {};

  */;

  ig.module('game.entities.trader').requires('game.entities.common.static-entity', 'game.entities.inventory', 'game.entities.dialog').defines(function() {
    return EntityTrader = EntityStaticEntity.extend({
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
      animSheet: new ig.AnimationSheet('media/characters/trader.png', 48, 64),
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
      states: {
        DEFAULT: 1,
        IN_INVENTORY: 2
      },
      state: null,
      facing: 'Down',
      velocity: 200,
      maxVel: {
        x: 500,
        y: 500
      },
      idleAnimSpeed: 1,
      movingAnimSpeed: 0.06,
      movementAllowed: true,
      inventory: null,
      init: function(x, y, settings) {
        var dialog;

        this.addAnim('idleDown', this.idleAnimSpeed, [0]);
        this.addAnim('idleUp', this.idleAnimSpeed, [8]);
        this.addAnim('idleRight', this.idleAnimSpeed, [16]);
        this.addAnim('idleLeft', this.idleAnimSpeed, [24]);
        this.addAnim('walkDown', this.movingAnimSpeed, [0, 1, 2, 3, 4, 5, 6, 7]);
        this.addAnim('walkUp', this.movingAnimSpeed, [8, 9, 10, 11, 12, 13, 14, 15]);
        this.addAnim('walkRight', this.movingAnimSpeed, [16, 17, 18, 19, 20, 21, 22, 23]);
        this.addAnim('walkLeft', this.movingAnimSpeed, [24, 25, 26, 27, 28, 29, 30, 31]);
        this.state = this.states.DEFAULT;
        if (!ig.global.wm) {
          this.inventory = ig.game.spawnEntity(EntityInventory);
          this.inventory.pos.x = (ig.system.width - this.inventory.size.x) / 2;
          this.inventory.pos.y = (ig.system.height - this.inventory.size.y) / 2;
        }
        this.parent(x, y, settings);
        dialog = ig.game.spawnEntity(EntityDialog, this.pos.x + this.dialogRelativePos.x, this.pos.y + this.dialogRelativePos.y, {
          text: ["I enjoy purchasing\nvarious species of\ntrees!"]
        });
        return this.dialogs.push(dialog);
      },
      update: function() {
        this.playerIsNear = this.distanceTo(ig.game.player) < 110;
        return this.parent();
      },
      draw: function() {
        if (!ig.global.wm) {
          this.inventory.isVisible = this.state === this.states.IN_INVENTORY;
        }
        if (ig.input.pressed('confirm') && this.playerIsNear) {
          this.dialogVisible = this.playerIsNear && !this.dialogVisible;
          ig.game.player.movementAllowed = !this.dialogVisible;
        }
        if (this.playerIsNear) {
          if (this.dialogVisible) {
            this.dialogs[0].visible = true;
            this.dialogs[0].pos = {
              x: this.pos.x - ig.game.screen.x + this.dialogRelativePos.x,
              y: this.pos.y - ig.game.screen.y + this.dialogRelativePos.y
            };
          } else {
            this.dialogs[0].visible = false;
            this.bubble.draw(this.pos.x - ig.game.screen.x + this.bubbleRelativePos.x, this.pos.y - ig.game.screen.y + this.bubbleRelativePos.y);
          }
        }
        return this.parent();
      }
    });
  });

}).call(this);
