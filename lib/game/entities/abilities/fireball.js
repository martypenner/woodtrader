//@ sourceMappingURL=fireball.map
ig.module('game.entities.abilities.fireball').requires('plusplus.abstractities.projectile').defines(function() {
  return ig.Fireball = ig.Projectile.extend({
    size: {
      x: 11,
      y: 11
    },
    collides: ig.Entity.COLLIDES.NEVER,
    type: ig.Entity.TYPE.A,
    checkAgainst: ig.Entity.TYPE.BOTH,
    animSheet: new ig.AnimationSheet(ig.CONFIG.PATH_TO_CHARACTERS + 'fireball.png', 11, 11),
    animFrameTime: 1,
    animSettings: {
      invisible: {
        sequence: [1000]
      },
      moveUp: {
        sequence: [0]
      },
      moveDown: {
        sequence: [1]
      },
      moveRight: {
        sequence: [2]
      },
      moveLeft: {
        sequence: [3]
      }
    },
    canFlipX: false,
    canFlipY: false,
    damage: 5,
    maxVel: {
      x: 1000,
      y: 1000
    },
    collisionKills: true,
    kill: function() {
      ig.game.spawnEntity(ig.EntityExplosion, this.pos.x, this.pos.y);
      return this.parent();
    }
  });
});
