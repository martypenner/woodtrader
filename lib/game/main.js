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

ig.module('game.main').requires('impact.game', 'impact.font', 'impact.debug.debug', 'plugins.impact-splash-loader', 'plugins.director.director', 'plugins.gui', 'game.levels.market1', 'game.levels.forest1', 'game.common.weaponizr', 'game.entities.common.base-entity', 'game.entities.common.particle-generator', 'game.entities.common.particle', 'game.entities.weapons.axe', 'game.entities.weapons.fireball', 'game.entities.inventory', 'game.entities.inventory-item', 'game.entities.player', 'game.entities.trader', 'game.entities.stall', 'game.entities.tree', 'game.entities.log', 'game.entities.menu', 'game.entities.enemy', 'game.entities.dialog').defines(function() {
  var MainGame, StartScreen;

  ig.Game.inject({
    loadLevel: function(level) {
      var levelName, persistedProperties, property, x, y, _i, _len, _ref, _ref1, _ref2;

      persistedProperties = {};
      if ((this.player != null) && (this.player.persistedProperties != null)) {
        _ref = this.player.persistedProperties;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          property = _ref[_i];
          persistedProperties[property] = this.player[property];
        }
      }
      this.parent(level);
      levelName = (function() {
        switch (level) {
          case LevelMarket1:
            elems.canvas.removeClass('dark');
            return 'Market1';
          case LevelForest1:
            elems.canvas.addClass('dark');
            return 'Forest1';
        }
      })();
      if (this.playerLastPos != null) {
        _ref1 = this.playerLastPos, x = _ref1.x, y = _ref1.y;
        x = x > 30 ? 30 : this.mainBgMap.width * this.mainBgMap.tilesize - 30;
      } else {
        _ref2 = this.playerStartingLevelPositions[levelName], x = _ref2.x, y = _ref2.y;
      }
      this.spawnEntity(EntityPlayer, x, y, persistedProperties);
      return this.weaponizr = new Weaponizr();
    }
  });
  MainGame = ig.Game.extend({
    arial12: new ig.Font('media/fonts/arial-12-normal-white.png'),
    arial14: new ig.Font('media/fonts/arial-14-normal-white.png'),
    arial16: new ig.Font('media/fonts/arial-16-normal-white.png'),
    bgMusicMarket: new ig.Sound('media/music/01-A-Night-Of-Dizzy-Spells.*'),
    bgMusicForest: new ig.Sound('media/music/02-Underclocked-Underunderclocked-Mix.*'),
    pauseFx: new ig.Sound('media/sounds/pause.*'),
    unpauseFx: new ig.Sound('media/sounds/unpause.*'),
    mainBgMap: null,
    director: null,
    weaponizr: null,
    autoSort: true,
    sortBy: ig.Game.SORT.POS_Y,
    player: null,
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
      $(window).blur(function() {
        return ig.game.pause();
      });
      $(document).keyup(function(e) {
        var _ref;

        if ((_ref = e.which) === 27 || _ref === 80) {
          return ig.game.togglePause();
        }
      });
      ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
      ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
      ig.input.bind(ig.KEY.UP_ARROW, 'up');
      ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
      ig.input.bind(ig.KEY.SPACE, 'attack');
      ig.input.bind(ig.KEY.TAB, 'switchWeapon');
      ig.input.bind(ig.KEY.ENTER, 'confirm');
      ig.input.bind(ig.KEY.I, 'inventory');
      ig.input.bind(ig.KEY.MOUSE1, 'confirm');
      this.addGui();
      ig.music.loop = true;
      ig.music.volume = 0.5;
      ig.music.add(this.bgMusicMarket, 'market');
      ig.music.add(this.bgMusicForest, 'forest');
      ig.music.play('market');
      return this.director = new ig.Director(this, [LevelMarket1, LevelForest1]);
    },
    update: function() {
      var mapHeight, mapWidth, x, y, _ref;

      this.parent();
      this.weaponizr.update();
      if ((_ref = this.mainBgMap) == null) {
        this.mainBgMap = ig.game.getMapByName('main');
      }
      if (this.player != null) {
        this.playerLastPos = this.player.pos;
        x = this.player.pos.x - ig.system.width / 2;
        y = this.player.pos.y - ig.system.height / 2;
        mapWidth = this.mainBgMap.width * this.mainBgMap.tilesize - ig.system.width;
        mapHeight = this.mainBgMap.height * this.mainBgMap.tilesize - ig.system.height;
        x = x < 0 ? 0 : x > mapWidth ? mapWidth : x;
        y = y < 0 ? 0 : y > mapHeight ? mapHeight : y;
        this.screen.x = x;
        return this.screen.y = y;
      }
    },
    draw: function() {
      var hudString;

      this.parent();
      hudString = "Health: " + this.player.health + "\nMana: " + this.player.mana + "\nLogs: " + (this.player.inventory.getCount('log'));
      this.arial12.draw(hudString, 20, 20);
      return ig.gui.draw();
    },
    addGui: function() {
      var img;

      return img = new ig.Image('media/joystick.png');
    },
    pause: function() {
      var _ref;

      if (!ig.system || !((_ref = ig.system) != null ? _ref.running : void 0)) {
        return;
      }
      this.pauseFx.play();
      ig.music.pause();
      ig.system.stopRunLoop();
      elems.canvas.addClass('inactive');
      return elems.gui.paused.show();
    },
    unpause: function() {
      var _ref;

      if (!ig.system || ((_ref = ig.system) != null ? _ref.running : void 0)) {
        return;
      }
      this.unpauseFx.play();
      ig.music.play();
      ig.system.startRunLoop();
      elems.canvas.removeClass('inactive');
      return elems.gui.paused.hide();
    },
    togglePause: function() {
      var _ref;

      if ((_ref = ig.system) != null ? _ref.running : void 0) {
        return ig.game.pause();
      } else {
        return ig.game.unpause();
      }
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
  return ig.main('#canvas', StartScreen, 60, elems.canvas.width(), elems.canvas.height(), 1, ig.ImpactSplashLoader);
});
