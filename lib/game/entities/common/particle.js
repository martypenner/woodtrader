(function() {
  /*;
  var EntityParticle;

  EntityParticle = {};

  */;

  ig.module('game.entities.common.particle').requires('impact.entity').defines(function() {
    return EntityParticle = ig.Entity.extend({
      size: {
        x: 2,
        y: 2
      },
      maxVel: {
        x: 160,
        y: 200
      },
      lifetime: 0.7,
      fadetime: 1,
      idleTimer: null,
      bounciness: 0,
      vel: {
        x: 100,
        y: 30
      },
      friction: {
        x: 100,
        y: 0
      },
      collides: ig.Entity.TYPE.LITE,
      colorOffset: 0,
      totalColors: 7,
      animSheet: new ig.AnimationSheet('media/environment/particle.png', 2, 2),
      init: function(x, y, settings) {
        var frameId;

        this.parent(x, y, settings);
        frameId = Math.round(Math.random() * this.totalColors) + (this.colorOffset * (this.totalColors + 1));
        this.addAnim('idle', 0.2, [frameId]);
        this.vel.x = (Math.random() * 2 - 1) * this.vel.x;
        this.vel.y = (Math.random() * 2 - 1) * this.vel.y;
        return this.idleTimer = new ig.Timer();
      },
      update: function() {
        if (this.idleTimer.delta() > this.lifetime) {
          this.kill();
          return;
        }
        this.currentAnim.alpha = this.idleTimer.delta().map(this.lifetime - this.fadetime, this.lifetime, 1, 0);
        return this.parent();
      }
    });
  });

}).call(this);
