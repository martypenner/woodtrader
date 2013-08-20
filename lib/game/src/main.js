var WoodTraderGame = {};

// Cache all jQuery elements
var elems = {
    window: $(window),
    canvas: $('#canvas'),
    guiContainer: $('#gui'),
    gui: {
        paused: $('#paused')
    }
};

// Position various gui elements
elems.gui.paused.css({
    top: (elems.canvas.height() - elems.gui.paused.height()) / 2,
    left: (elems.canvas.width() - elems.gui.paused.width()) / 2
});

ig.module(
    'game.main'
)
.requires(
    'impact.game',
    'impact.font',

    // Plugins
    'plugins.impact-splash-loader',
    'plugins.gui',
    'plusplus.core.plusplus',

    // Levels
    'game.levels.market1',
    'game.levels.forest1',

    // Debug
    'plusplus.debug.debug',

    // Entities
    'game.entities.inventory',
    'game.entities.inventory-item',
    'game.entities.player',
    'game.entities.trader',
    'game.entities.stall',
    'game.entities.tree',
    'game.entities.log',
    'game.entities.menu',
    'game.entities.dialog',
    'plusplus.entities.conversation'
)
.defines(function () {

    // Make the canvas lighter or darker, depending on which level we're building
    ig.GameExtended.inject({
        loadLevelDeferred: function (level, playerSpawnerName) {
            this.parent(level, playerSpawnerName);
        }
    });

    MainGame = ig.GameExtended.extend({
        // Load fonts
        arial12: new ig.Font('media/fonts/arial-12-normal-white.png'),
        arial14: new ig.Font('media/fonts/arial-14-normal-white.png'),
        arial16: new ig.Font('media/fonts/arial-16-normal-white.png'),

        // Preload music
        bgMusicMarket: new ig.Sound(ig.CONFIG.PATH_TO_MUSIC + '01-A-Night-Of-Dizzy-Spells.*'),
        bgMusicForest: new ig.Sound(ig.CONFIG.PATH_TO_MUSIC + '02-Underclocked-Underunderclocked-Mix.*'),

        // Preload sounds
        pauseFx: new ig.Sound(ig.CONFIG.PATH_TO_SOUNDS + 'pause.*'),
        unpauseFx: new ig.Sound(ig.CONFIG.PATH_TO_SOUNDS + 'unpause.*'),

        // The main background map, used in camera and player positioning calculations
        mainBgMap: null,

        // Sort all entities by their Y position
        autoSort: true,
        sortBy: ig.Game.SORT.POS_Y,

        // Globally store the player entity's various related data for performance and ease of reference
        playerStartingLevelPositions: {
            Market1: {x: 472, y: 292},
            Forest1: {x: 242, y: 202}
        },
        playerLastPos: null,

        init: function () {
            this.parent();
            this.addGui();

            // Decrease the volume so the sound effects are heard better
            ig.music.loop = true;
            ig.music.volume = 0.5;

            // Add and play music
            ig.music.add(this.bgMusicMarket, 'market');
            ig.music.add(this.bgMusicForest, 'forest');
            ig.music.play('market');

            this.loadLevelDeferred('Market1', 'playerSpawnCheckpoint');
        },

        inputStart: function () {
            // Bind keys
            ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
            ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
            ig.input.bind(ig.KEY.UP_ARROW, 'up');
            ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
            ig.input.bind(ig.KEY.SPACE, 'attack');
            ig.input.bind(ig.KEY.TAB, 'switchWeapon');
            ig.input.bind(ig.KEY.ENTER, 'confirm');
            ig.input.bind(ig.KEY.I, 'inventory');

            // Bind mouse events
            ig.input.bind(ig.KEY.MOUSE1, 'confirm');
        },

        update: function () {
            // Update all entities and background maps
            this.parent();

            // Sort entities
            this.sortEntities();

            this.mainBgMap = this.mainBgMap || ig.game.getMapByName('main');

            if (ig.global.player && ig.global.player.name === 'player') {
                var player = ig.global.player;

                // Store the player's last position so we can spawn him/her at an appropriate place
                // when loading a new level. E.g. walking through a door on the right edge of the map
                // and in the center of the screen should spawn the player at the left edge of the
                // next level's map and in the center
                this.playerLastPos = player.pos;
            }
        },

        draw: function () {
            // Call draw on the parent object to make sure that all draws to the canvas are finalized
            this.parent();

            if (ig.global.player && ig.global.player.name === 'player')
                var player = ig.global.player;

                var hudString = "Health: " + player.health + "\n" +
                    "Energy: " + player.energy + "\n" +
                    "Logs: " + player.inventory.getCount('log') + "\n" +
                    "Current Weapon: " + player.weapons[player.activeWeaponIndex];

                this.arial12.draw(hudString, 20, 20);

            ig.gui.draw();
        },

        addGui: function () {
            var img = new ig.Image('media/joystick.png');

//            ig.gui.element.add
//                name: 'left'
//                size: x: 47, y: 47
//                pos: x: 47, y: ig.system.height / 50
//                state:
//                    normal:
//                        image: img
//                        tile: 0
//                        tileSize: 47
//                    active:
//                        image: img
//                        tile: 1
//                        tileSize: 47
//                click: ->
//                    console.log 'clicked'
        }
//        pause: ->
//            return if not ig.system or not ig.system?.running
//
//            @pauseFx.play()
//            ig.music.pause()
//            ig.system.stopRunLoop()
//            elems.canvas.addClass('inactive')
//
//            // Show the paused text
//            elems.gui.paused.show()
//
//        unpause: ->
//            return if not ig.system or ig.system?.running
//
//            @unpauseFx.play()
//            ig.music.play()
//            ig.system.startRunLoop()
//            elems.canvas.removeClass('inactive')
//            elems.gui.paused.hide()
//
//        togglePause: ->
//            if ig.system?.running
//                ig.game.pause()
//            else
//                ig.game.unpause()
    });

    StartScreen = ig.Game.extend({
        arial12: new ig.Font('media/fonts/arial-12-normal-white.png'),
        arial16: new ig.Font('media/fonts/arial-16-normal-white.png'),
        instructText: 'Press Space To Start',
        gameNameText: 'WOODTRADER',

        inputStart: function () {
            ig.input.bind(ig.KEY.SPACE, 'start');
        },

        update: function () {
            this.parent();

            if (ig.input.pressed('start')) {
                ig.system.setGame(MainGame);
            }
        },

        draw: function () {
            this.parent();

            var x = ig.system.width / 2;
            var y = ig.system.height - this.arial12.heightForString(this.instructText) - 10;
            this.arial12.draw(this.instructText, x, y, ig.Font.ALIGN.CENTER);

            y = ig.system.height / 2;
            this.arial16.draw(this.gameNameText, x, y, ig.Font.ALIGN.CENTER);
        }

});
    // Start the game
//    ig.main '#canvas', StartScreen, 60, elems.canvas.width(), elems.canvas.height(), 1, ig.ImpactSplashLoader
    ig.main('#canvas', MainGame, 60, elems.canvas.width(), elems.canvas.height(), 1, ig.ImpactSplashLoader);
});
