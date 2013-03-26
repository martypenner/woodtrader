//@ sourceMappingURL=fireball.map
/*;
var EntityFireball;

EntityFireball = {};

*/;

ig.module('game.entities.weapons.fireball').requires('game.entities.common.base-entity').defines(function() {
  return EntityFireball = EntityBaseEntity.extend({
    size: {
      x: 11,
      y: 11
    },
    collides: ig.Entity.COLLIDES.NEVER,
    type: ig.Entity.TYPE.A,
    checkAgainst: ig.Entity.TYPE.BOTH,
    animSheet: new ig.AnimationSheet('media/characters/fireball.png', 11, 11),
    use: new ig.Sound('media/sounds/fireball-cast.*'),
    maxVel: {
      x: 400,
      y: 400
    },
    usesMana: true,
    cost: 5,
    canFire: false,
    idleAnimSpeed: 0.06,
    lifeTimer: null,
    lifeTime: 5,
    init: function(x, y, settings) {
      this.addAnim('invisible', this.idleAnimSpeed, [1000]);
      this.addAnim('up', this.idleAnimSpeed, [0]);
      this.addAnim('down', this.idleAnimSpeed, [1]);
      this.addAnim('right', this.idleAnimSpeed, [2]);
      this.addAnim('left', this.idleAnimSpeed, [3]);
      return this.parent(x, y, settings);
    },
    fire: function() {
      this.currentAnim = this.facing.toLowerCase();
      this.lifeTimer = new ig.Timer();
      this.use.play();
      this.currentAnim = this.anims[this.facing.toLowerCase()];
      this.vel = this.vel.x > 0 || this.vel.y > 0 ? this.vel : this.facing === 'Up' ? {
        x: 0,
        y: -this.maxVel.y
      } : this.facing === 'Down' ? {
        x: 0,
        y: this.maxVel.y
      } : this.facing === 'Right' ? {
        x: this.maxVel.x,
        y: 0
      } : this.facing === 'Left' ? {
        x: -this.maxVel.x,
        y: 0
      } : void 0;
      return this.canFire = true;
    },
    update: function() {
      if (!this.canFire) {
        return;
      }
      if ((this.vel.x === 0 && this.vel.y === 0) || this.lifeTimer.delta() > this.lifeTime) {
        this.kill();
      }
      return this.parent();
    },
    check: function(other) {
      if (!this.canFire) {
        return;
      }
      other.receiveDamage(5, this);
      return this.kill();
    },
    handleMovementTrace: function(res) {
      if (!this.canFire) {
        return;
      }
      if (res.collision.x || res.collision.y) {
        this.kill();
      }
      return this.parent(res);
    }
  });
});
