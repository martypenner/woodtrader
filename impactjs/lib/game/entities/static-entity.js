ig.module(
    'game.entities.static-entity'
)
.requires(
    'impact.entity'
)
.defines(function () {

EntityStaticEntity = ig.Entity.extend({
    size: {x: 8, y: 8},
    collides: ig.Entity.COLLIDES.FIXED,

    frame: 0,

    init: function (x, y, settings) {
        this.addAnim('idle', 1, [this.frame]);

        this.parent(x, y, settings);
    }
});

});
