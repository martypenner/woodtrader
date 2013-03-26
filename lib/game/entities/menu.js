(function() {
  /*;
  var EntityMenu;

  EntityMenu = {};

  */;

  ig.module('game.entities.menu').requires('game.entities.common.static-entity').defines(function() {
    return EntityMenu = EntityStaticEntity.extend({
      size: {
        x: 128,
        y: 80
      },
      collides: ig.Entity.COLLIDES.NEVER,
      animSheet: new ig.AnimationSheet('media/buildings/stall.png', 128, 80),
      isVisible: false,
      draw: function() {
        if (this.isVisible) {
          ig.game.font.draw('Beluga whales go fishing in the deep blue see?', 100, 100);
        }
        return this.parent();
      },
      showMenuTrigger: function(other, trigger) {
        if (other.name === 'player') {
          return this.isVisible = true;
        }
      },
      hideMenuTrigger: function(other, trigger) {
        if (other.name === 'player') {
          return this.isVisible = false;
        }
      }
    });
  });

}).call(this);
