ig.module(
    'game.entities.common.base-entity'
)
.requires(
    'impact.entity'
)
.defines(function () {

EntityBaseEntity = ig.Entity.extend({

    // Set this entity's zIndex to its bottom left corner y position and re-sort all entities
    init: function (x, y, settings) {
        if (!ig.global.wm) {
            var size = this.size && this.size.y ? this.size.y : 0;
            this.zIndex = parseInt(y + size);
            ig.game.sortEntitiesDeferred();
        }

        this.parent(x, y, settings);
    }

});

});