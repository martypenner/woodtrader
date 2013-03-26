//@ sourceMappingURL=axe.map
/*;
var EntityAxe;

EntityAxe = {};

*/;

ig.module('game.entities.weapons.axe').requires('impact.entity').defines(function() {
  return EntityAxe = ig.Entity.extend({
    size: {
      x: 16,
      y: 16
    },
    collides: ig.Entity.COLLIDES.NEVER,
    type: ig.Entity.TYPE.B,
    checkAgainst: ig.Entity.TYPE.A,
    use: new ig.Sound('media/sounds/axe-swing.*'),
    cost: 0,
    lifeTimer: null,
    init: function(x, y, settings) {
      this.lifeTimer = new ig.Timer();
      this.use.play();
      return this.parent(x, y, settings);
    },
    update: function() {
      if (this.lifeTimer.delta() > 0.2) {
        this.kill();
      }
      return this.parent();
    },
    check: function(other) {
      if (other.entityType === 'tree') {
        other.receiveDamage(3.5, this);
        return this.kill();
      }
    }
  });
});
