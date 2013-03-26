//@ sourceMappingURL=level-change.map
(function() {
  /*;
  var EntityLevelChange;

  EntityLevelChange = {};

  */;

  ig.module('game.entities.level-change').requires('game.entities.common.base-entity').defines(function() {
    return EntityLevelChange = EntityBaseEntity.extend({
      size: {
        x: 16,
        y: 16
      },
      collides: ig.Entity.COLLIDES.NEVER,
      type: ig.Entity.TYPE.NONE,
      _wmScalable: true,
      _wmDrawBox: true,
      _wmBoxColor: 'rgba(196, 255, 0, 0.7)',
      init: function(x, y, settings) {
        return this.parent(x, y, settings);
      },
      loadLevelTrigger: function(other, trigger) {
        var desiredLevel;

        if (this.level == null) {
          return;
        }
        ig.music.stop();
        desiredLevel = (function() {
          switch (this.level) {
            case 'Market1':
              ig.music.play('market');
              return LevelMarket1;
            case 'Forest1':
              ig.music.play('forest');
              return LevelForest1;
          }
        }).call(this);
        return ig.game.director.jumpTo(desiredLevel);
      }
    });
  });

}).call(this);
