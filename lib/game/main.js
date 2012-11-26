ig.module(
    'game.main'
)
.requires(
    'impact.game',
    'impact.font',

    // Debug
    'impact.debug.debug',

    // Plugins
    'plugins.impact-splash-loader',
    'plugins.gui',
    'plugins.director.director',

    // Levels
    'game.levels.market1',

    // Entities
    'game.entities.common.base-entity',
    'game.entities.inventory',
    'game.entities.inventory-item',
    'game.entities.player',
    'game.entities.trader',
    'game.entities.stall',
    'game.entities.menu',
    'game.entities.enemy'
)
.defines(function () {

$(window).blur(function () {
    if (ig.system) {
        ig.music.stop();
        ig.system.stopRunLoop();
    }
});

$(window).focus(function () {
    if (ig.system) {
        ig.music.play();
        ig.system.startRunLoop();
    }
});

WoodTrader = ig.Game.extend({

    // Load a font
    font: new ig.Font('media/fonts/04b03.font.png'),

    // Globally store the player entity for performance and ease of reference
    player: null,

    // Store a global level director
    director: null,

    init: function() {
        // Load EaselJS
//        SystemManager.init();

        // Bind keys
        ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
        ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
        ig.input.bind(ig.KEY.UP_ARROW, 'up');
        ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
        ig.input.bind(ig.KEY.SPACE, 'attack');
        ig.input.bind(ig.KEY.ENTER, 'confirm');
        ig.input.bind(ig.KEY.I, 'inventory');

        // Bind mouse events
        ig.input.bind(ig.KEY.MOUSE1, 'confirm');

        // Disable the GUI by default
        ig.gui.show = false;

        this.director = new ig.Director(this, LevelMarket1);

        // Load level 1
        this.director.loadLevel(0);

        // Add GUI elements
        this.addGui();
    },

    update: function() {
        // Update all entities and backgroundMaps
        this.parent();

        // Screen follows the player
        if (this.player) {
            var x = this.player.pos.x - ig.system.width / 2;
            var y = this.player.pos.y - ig.system.height / 2;
            var mainBgMap = ig.game.getMapByName('grass');
            var mapWidth = mainBgMap.width * mainBgMap.tilesize - ig.system.width;
            var mapHeight = mainBgMap.height * mainBgMap.tilesize - ig.system.height;

            // Ensure that the screen doesn't scroll past the map limits
            x = x < 0 ? 0 :
                x > mapWidth ? mapWidth : x;
            y = y < 0 ? 0 :
                y > mapHeight ? mapHeight : y;

            this.screen.x = x;
            this.screen.y = y;
        }
    },

    draw: function() {
        // Clear out the main canvas since Easel will have drawn things that Impact doesn’t know about
//        var ctx = ig.system.context;
//        ctx.setTransform(1, 0, 0, 1, 0, 0);
//        ctx.clearRect(0, 0, ig.system.width, ig.system.height);

        // Call draw on the parent object to make sure that all draws to the canvas are finalized
        // before telling Easel to update
        this.parent();

        if (ig.gui.show) {
            ig.gui.draw();
        }

        // Calls tick on our SystemManager object, which is the main EaselJS code
        // that handles drawing the non-gameplay elements
//        SystemManager.tick();
    },

    addGui: function () {
        ig.gui.element.add({
            name: 'inventory',
            group: 'inventory',
            size: {x: 47, y: 47},
            pos: {x: 0, y: ig.system.height - 47},
            state: {
                normal: {
                    image: new ig.Image('media/joystick.png'),
                    tile: 2,
                    tileSize: 47
                }
            },
            click: function () {
                console.log('clicked');
            }
        });
    }
});

// Start the game
ig.main('#canvas', WoodTrader, 60, 1024, 768, 1, ig.ImpactSplashLoader);

});
