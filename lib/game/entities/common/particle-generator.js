(function() {
  /*;
  var EntityParticleGenerator;

  EntityParticleGenerator = {};

  */;

  ig.module('game.entities.common.particle-generator').requires('game.entities.common.particle', 'impact.entity').defines(function() {
    return EntityParticleGenerator = ig.Entity.extend({
      lifetime: 1,
      callback: null,
      particles: 25,
      idleTimer: null,
      init: function(x, y, settings) {
        var _i, _ref;

        this.parent(x, y, settings);
        for (_i = 0, _ref = this.particles; 0 <= _ref ? _i <= _ref : _i >= _ref; 0 <= _ref ? _i++ : _i--) {
          ig.game.spawnEntity(EntityParticle, x, y, {
            colorOffset: settings.colorOffset ? settings.colorOffset : 0
          });
        }
        return this.idleTimer = new ig.Timer();
      },
      update: function() {
        if (this.idleTimer.delta() > this.lifetime) {
          this.kill();
          if (this.callback != null) {
            return this.callback;
          }
        }
      }
    });
  });

}).call(this);
