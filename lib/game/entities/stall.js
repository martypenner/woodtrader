ig.module(
    'game.entities.stall'
)
.requires(
    'game.entities.static-entity'
)
.defines(function () {

EntityStall = EntityStaticEntity.extend({
    size: {x: 128, y: 80},
    animSheet: new ig.AnimationSheet('media/stall.png', 128, 80),

    draw: function () {
        var player = ig.game.getEntitiesByType(EntityPlayer)[0];

        if (this.distanceTo(player) < 110) {
            var x = this.pos.x - 20;
            var y = this.pos.y;

            // Make sure to draw the text within the viewport
            if (x < ig.game.screen.x) {
                x = ig.game.screen.x;
                y -= 10;
            }

            ig.game.font.draw('yep', x, y);
        }

        this.parent();
    }
});

});
