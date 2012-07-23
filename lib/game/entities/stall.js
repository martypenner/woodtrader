ig.module(
    'game.entities.stall'
)
.requires(
    'game.entities.static-entity'
)
.defines(function () {

EntityStall = EntityStaticEntity.extend({

    size: {x: 128, y: 60},
    offset: {x: 0, y: 20},
    animSheet: new ig.AnimationSheet('media/buildings/stall.png', 128, 80),

    zIndex: 2,

    // The associated trader entity
    trader: null,

    init: function (x, y, settings) {
        // Call the parent constructor first so all of the entities are drawn and positioned
        this.parent(x, y, settings);

        // Store the associated trader entity
        var trader = ig.game.getEntityByName(this.trader);
        this.trader = trader ? trader : null;
    },

    update: function () {
        if (this.trader) {
            this.trader.playerIsNear = this.distanceTo(ig.game.player) < 110;
        }

        this.parent();
    }
});

});
