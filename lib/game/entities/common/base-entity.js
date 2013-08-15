//@ sourceMappingURL=base-entity.map
/*;
var EntityBaseEntity;

EntityBaseEntity = {};

*/;

ig.module('game.entities.common.base-entity').requires('plusplus.core.entity').defines(function() {
  return EntityBaseEntity = ig.EntityExtended.extend({
    init: function(x, y, settings) {
      return this.parent(x, y, settings);
    }
  });
});
