ig.module(
    'game.entities.common.static-entity'
)
.requires(
    'game.entities.common.base-entity'
)
.defines(function () {

EntityStaticEntity = EntityBaseEntity.extend({
    size: {x: 8, y: 8},
    collides: ig.Entity.COLLIDES.FIXED,

    frame: 0,

    init: function (x, y, settings) {
        this.addAnim('idle', 1, [this.frame]);

        this.parent(x, y, settings);
    }
});

});
