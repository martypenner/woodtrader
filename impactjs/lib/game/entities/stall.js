ig.module(
    'game.entities.stall'
)
.requires(
    'game.entities.static-entity'
)
.defines(function () {

EntityStall = EntityStaticEntity.extend({
    size: {x: 128, y: 80},
    animSheet: new ig.AnimationSheet('media/stall.png', 128, 80)
});

});
