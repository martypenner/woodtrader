//@ sourceMappingURL=base-entity.map
/*;
var EntityBaseEntity;

EntityBaseEntity = {};

*/;

ig.module('game.entities.common.base-entity').requires('impact.entity').defines(function() {
  return EntityBaseEntity = ig.Entity.extend({
    init: function(x, y, settings) {
      return this.parent(x, y, settings);
    }
  });
});
