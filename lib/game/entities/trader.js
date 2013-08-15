//@ sourceMappingURL=trader.map
/*;
var EntityTrader;

EntityTrader = {};

*/;

ig.module('game.entities.trader').requires('game.entities.common.static-entity', 'game.entities.inventory', 'game.entities.dialog').defines(function() {
  return EntityTrader = EntityBaseEntity.extend({
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
    collides: ig.Entity.COLLIDES.FIXED,
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

      this.state = this.states.DEFAULT;
      if (!ig.global.wm) {
        this.inventory = ig.game.spawnEntity(EntityInventory);
        this.inventory.pos.x = (ig.system.width - this.inventory.size.x) / 2;
        this.inventory.pos.y = (ig.system.height - this.inventory.size.y) / 2;
        dialog = ig.game.spawnEntity(EntityDialog, this.pos.x + this.dialogRelativePos.x, this.pos.y + this.dialogRelativePos.y, {
          text: ["I enjoy purchasing\nvarious species of\ntrees!"]
        });
        this.dialogs.push(dialog);
      }
      return this.parent(x, y, settings);
    },
    update: function() {
      this.playerIsNear = this.distanceTo(ig.global.player) < 110;
      return this.parent();
    },
    draw: function() {
      if (!ig.global.wm) {
        this.inventory.isVisible = this.state === this.states.IN_INVENTORY;
      }
      if (ig.input.pressed('confirm') && this.playerIsNear) {
        this.dialogVisible = this.playerIsNear && !this.dialogVisible;
        ig.global.player.movementAllowed = !this.dialogVisible;
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
