//@ sourceMappingURL=axe.map
ig.module('game.entities.abilities.axe').requires('plusplus.abilities.melee').defines(function() {
  return ig.EntityAxe = ig.AbilityMelee.extend({
    size: {
      x: 16,
      y: 16
    },
    collides: ig.Entity.COLLIDES.NEVER,
    type: ig.Entity.TYPE.B,
    checkAgainst: ig.Entity.TYPE.A,
    swingSound: new ig.Sound(ig.CONFIG.PATH_TO_SOUNDS + 'axe-swing.*'),
    canFindTarget: false,
    requiresTarget: false,
    regenBlocking: false,
    cooldownDelay: 0,
    damage: 10,
    activate: function() {
      var e;

      this.swingSound.play();
      try {
        return this.parent();
      } catch (_error) {
        e = _error;
        console.log(e, this.failReason);
        this.dropEntityTarget();
        return console.log('sdf');
      }
    }
  });
});
