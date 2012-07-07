ig.module(
    'game.main'
)
.requires(
    'impact.game',
    'impact.font',

    'game.levels.market1',

    'game.entities.player',
    'game.entities.stall',
    'game.entities.menu',
    'game.entities.menu-trigger',
    'game.entities.enemy'
)
.defines(function(){

WoodTrader = ig.Game.extend({

    // Load a font
    font: new ig.Font('media/04b03.font.png'),

    init: function() {
        ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
        ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
        ig.input.bind(ig.KEY.UP_ARROW, 'up');
        ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
        ig.input.bind(ig.KEY.ENTER, 'ok');

        this.loadLevel(LevelMarket1);
    },

    update: function() {
        // Update all entities and backgroundMaps
        this.parent();

        // Add your own, additional update code here
    },

    draw: function() {
        // Draw all entities and backgroundMaps
        this.parent();

        // Add your own drawing code here
    }
});

// Start the game
ig.main('#canvas', WoodTrader, 60, 1024, 768, 1);

});
