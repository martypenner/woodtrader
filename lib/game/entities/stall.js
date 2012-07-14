ig.module(
    'game.entities.stall'
)
.requires(
    'game.entities.static-entity'
)
.defines(function () {

EntityStall = EntityStaticEntity.extend({

    size: {x: 128, y: 80},
    animSheet: new ig.AnimationSheet('media/buildings/stall.png', 128, 80),

    player: null,

    menuX: null,
    menuY: null,
    menuVisible: false,

    init: function (x, y, settings) {
        // Call the parent constructor first so all of the entities are drawn and positioned
        this.parent(x, y, settings);

        // Calculate the menu position for this stall
        this.menuX = this.pos.x - 20;
        this.menuY = this.pos.y;

        // Make sure to draw the text within the viewport
        if (this.menuX < ig.game.screen.x) {
            this.menuX = ig.game.screen.x;
            this.menuY -= 10;
        }
    },

    update: function () {
        // Initialize/cache a reference to the player entity. This can't be done in init()
        // because the player entity may not have been initialized yet
        if (!this.player) {
            this.player = ig.game.getEntitiesByType(EntityPlayer)[0];
        }

        this.menuVisible = this.distanceTo(this.player) < 110;

        this.parent();
    },

    draw: function () {
        if (this.menuVisible) {
            ig.game.font.draw('yep', this.menuX, this.menuY);
        }

        this.parent();
    }
});

});
