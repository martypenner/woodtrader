ig.module(
    'game.entities.tree'
)
.requires(
    'game.entities.common.base-entity'
)
.defines(function () {

EntityTree = EntityBaseEntity.extend({

    size: {x: 24, y: 22},
    offset: {x: 24, y: 50},
    collides: ig.Entity.COLLIDES.FIXED,
    animSheet: new ig.AnimationSheet('media/environment/tree.png', 74, 74),

    init: function (x, y, settings) {
        // Add animations for the animation sheet
        this.addAnim('idle', 1000, [0]);

        // Call the parent constructor
        this.parent(x, y, settings);
    }
});

});