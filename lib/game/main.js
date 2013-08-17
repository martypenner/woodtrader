//@ sourceMappingURL=main.map
var WoodTraderGame, elems;

WoodTraderGame = {};

elems = {
  window: $(window),
  canvas: $('#canvas'),
  guiContainer: $('#gui'),
  gui: {
    paused: $('#paused')
  }
};

elems.gui.paused.css({
  top: (elems.canvas.height() - elems.gui.paused.height()) / 2,
  left: (elems.canvas.width() - elems.gui.paused.width()) / 2
});

ig.module('game.main').requires('impact.game', 'impact.font', 'plugins.impact-splash-loader', 'plugins.gui', 'plusplus.core.plusplus', 'game.levels.market1', 'game.levels.forest1', 'plusplus.debug.debug', 'game.entities.common.base-entity', 'game.entities.common.particle-generator', 'game.entities.common.particle', 'game.entities.inventory', 'game.entities.inventory-item', 'game.entities.player', 'game.entities.trader', 'game.entities.stall', 'game.entities.tree', 'game.entities.log', 'game.entities.menu', 'game.entities.enemy', 'game.entities.dialog', 'plusplus.entities.conversation').defines(function() {
  var MainGame, StartScreen;

  ig.GameExtended.inject({
    loadLevelDeferred: function(level, playerSpawnerName) {
      var levelName;

      this.parent(level, playerSpawnerName);
      return levelName = (function() {
        switch (level.toLowerCase()) {
          case 'market1':
            return 'Market1';
          case 'forest1':
            return 'Forest1';
        }
      })();
    }
  });
  MainGame = ig.GameExtended.extend({
    arial12: new ig.Font('media/fonts/arial-12-normal-white.png'),
    arial14: new ig.Font('media/fonts/arial-14-normal-white.png'),
    arial16: new ig.Font('media/fonts/arial-16-normal-white.png'),
    bgMusicMarket: new ig.Sound(ig.CONFIG.PATH_TO_MUSIC + '01-A-Night-Of-Dizzy-Spells.*'),
    bgMusicForest: new ig.Sound(ig.CONFIG.PATH_TO_MUSIC + '02-Underclocked-Underunderclocked-Mix.*'),
    pauseFx: new ig.Sound('media/sounds/pause.*'),
    unpauseFx: new ig.Sound('media/sounds/unpause.*'),
    mainBgMap: null,
    director: null,
    autoSort: true,
    sortBy: ig.Game.SORT.POS_Y,
    playerStartingLevelPositions: {
      Market1: {
        x: 472,
        y: 292
      },
      Forest1: {
        x: 242,
        y: 202
      }
    },
    playerLastPos: null,
    init: function() {
      this.parent();
      this.addGui();
      ig.music.loop = true;
      ig.music.volume = 0.5;
      ig.music.add(this.bgMusicMarket, 'market');
      ig.music.add(this.bgMusicForest, 'forest');
      ig.music.play('market');
      return this.loadLevelDeferred('Market1', 'playerSpawnCheckpoint');
    },
    inputStart: function() {
      ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
      ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
      ig.input.bind(ig.KEY.UP_ARROW, 'up');
      ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
      ig.input.bind(ig.KEY.SPACE, 'attack');
      ig.input.bind(ig.KEY.TAB, 'switchWeapon');
      ig.input.bind(ig.KEY.ENTER, 'confirm');
      ig.input.bind(ig.KEY.I, 'inventory');
      return ig.input.bind(ig.KEY.MOUSE1, 'confirm');
    },
    update: function() {
      var player, _ref, _ref1;

      this.parent();
      this.sortEntities();
      if ((_ref = this.mainBgMap) == null) {
        this.mainBgMap = ig.game.getMapByName('main');
      }
      if (((_ref1 = ig.global.player) != null ? _ref1.name : void 0) === 'player') {
        player = ig.global.player;
        return this.playerLastPos = player.pos;
      }
    },
    draw: function() {
      var hudString, player, _ref;

      this.parent();
      if (((_ref = ig.global.player) != null ? _ref.name : void 0) === 'player') {
        player = ig.global.player;
        hudString = "Health: " + player.health + "\nEnergy: " + player.energy + "\nLogs: " + (player.inventory.getCount('log')) + "\nCurrent Weapon: " + player.weapons[player.activeWeaponIndex];
        this.arial12.draw(hudString, 20, 20);
      }
      return ig.gui.draw();
    },
    addGui: function() {
      var img;

      return img = new ig.Image('media/joystick.png');
    }
  });
  StartScreen = ig.Game.extend({
    arial12: new ig.Font('media/fonts/arial-12-normal-white.png'),
    arial16: new ig.Font('media/fonts/arial-16-normal-white.png'),
    instructText: 'Press Space To Start',
    gameNameText: 'WOODTRADER',
    init: function() {
      return ig.input.bind(ig.KEY.SPACE, 'start');
    },
    update: function() {
      this.parent();
      if (ig.input.pressed('start')) {
        return ig.system.setGame(MainGame);
      }
    },
    draw: function() {
      var x, y;

      this.parent();
      x = ig.system.width / 2;
      y = ig.system.height - this.arial12.heightForString(this.instructText) - 10;
      this.arial12.draw(this.instructText, x, y, ig.Font.ALIGN.CENTER);
      y = ig.system.height / 2;
      return this.arial16.draw(this.gameNameText, x, y, ig.Font.ALIGN.CENTER);
    }
  });
  return ig.main('#canvas', MainGame, 60, elems.canvas.width(), elems.canvas.height(), 1, ig.ImpactSplashLoader);
});
