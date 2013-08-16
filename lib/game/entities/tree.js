//@ sourceMappingURL=tree.map
/*;
var EntityTree;

EntityTree = {};

*/;

ig.module('game.entities.tree').requires('plusplus.core.entity', 'game.common.flasher', 'plusplus.helpers.utils', 'plusplus.entities.particle-color', 'plusplus.abstractities.creature', 'game.entities.log').defines(function() {
  var utils;

  utils = ig.utils;
  return EntityTree = ig.Creature.extend({
    size: {
      x: 85,
      y: 55
    },
    offset: {
      x: 65,
      y: 155
    },
    collides: ig.Entity.COLLIDES.FIXED,
    type: ig.Entity.TYPE.A,
    animSheet: new ig.AnimationSheet('media/environment/tree.png', 220, 211),
    animSettings: {
      idleX: {
        sequence: [0],
        frameTime: 1
      }
    },
    collides: ig.Entity.COLLIDES.FIXED,
    treeStrike: new ig.Sound('media/sounds/tree-strike.*'),
    treeFall: new ig.Sound('media/sounds/tree-fall.*'),
    dropLogChance: 75,
    canFlipX: true,
    canFlipY: false,
    health: 10,
    canWander: false,
    deathSettings: {
      spawnCountMax: 30,
      spawnSettings: {
        animTileOffset: ig.EntityParticleColor.colorOffsets.BROWN
      }
    },
    initTypes: function() {
      return utils.addType(ig.EntityExtended, this, 'type', 'TREE');
    },
    receiveDamage: function(amount, from) {
      if (this.health - amount > 0) {
        this.treeStrike.play();
      }
      return this.parent(amount, from);
    },
    kill: function() {
      this.treeFall.play();
      if ((Math.random() * 100) < this.dropLogChance) {
        ig.game.spawnEntity(EntityLog, (this.size.x - 25) / 2 + this.pos.x, (this.size.x - 25) / 2 + this.pos.y - 10);
      }
      return this.parent();
    }
  });
});
