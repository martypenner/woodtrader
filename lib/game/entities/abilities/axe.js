//@ sourceMappingURL=axe.map
ig.module('game.entities.abilities.axe').requires('plusplus.abilities.melee', 'plusplus.helpers.utils').defines(function() {
  var utils;

  utils = ig.utils;
  return ig.EntityAxe = ig.AbilityMelee.extend({
    swingSound: new ig.Sound(ig.CONFIG.PATH_TO_SOUNDS + 'axe-swing.*'),
    canFindTarget: true,
    requiresTarget: true,
    regenBlocking: false,
    rangeX: 5,
    rangeY: 5,
    damage: 10,
    initTypes: function() {
      return utils.addType(ig.EntityExtended, this, 'typeTargetable', 'TREE');
    },
    execute: function() {
      this.swingSound.play();
      return this.parent();
    }
  });
});
