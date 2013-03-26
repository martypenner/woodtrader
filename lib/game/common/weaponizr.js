//@ sourceMappingURL=weaponizr.map
(function() {
  /*;
  var Weaponizr;

  Weaponizr = {};

  */;

  ig.module('game.common.weaponizr').requires().defines(function() {
    return Weaponizr = ig.Class.extend({
      activeEntities: [],
      init: function() {
        var entity, _i, _len, _ref, _results;

        _ref = ig.game.entities;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          entity = _ref[_i];
          if (entity.canUseWeapons != null) {
            entity.manaRegenerateTimer = new ig.Timer();
            entity.manaRegenerateDelayTimer = new ig.Timer();
            _results.push(this.activeEntities.push(entity));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      },
      update: function() {
        var entity, _i, _len, _ref, _results;

        _ref = this.activeEntities;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          entity = _ref[_i];
          this.regenerateMana(entity);
          this.changeEntityAnimation(entity);
          _results.push(this.spawnWeapon(entity));
        }
        return _results;
      },
      getWeaponCoordinates: function(weaponEntity, spawningEntity) {
        var pos;

        pos = {
          x: 0,
          y: 0
        };
        switch (spawningEntity.facing) {
          case 'Up':
            pos.x = spawningEntity.pos.x;
            pos.y = spawningEntity.pos.y - weaponEntity.size.y;
            break;
          case 'Down':
            pos.x = spawningEntity.pos.x;
            pos.y = spawningEntity.pos.y + weaponEntity.size.y;
            break;
          case 'Left':
            pos.x = spawningEntity.pos.x - weaponEntity.size.x;
            pos.y = spawningEntity.pos.y;
            break;
          case 'Right':
            pos.x = spawningEntity.pos.x + spawningEntity.size.x;
            pos.y = spawningEntity.pos.y;
            break;
          default:
            pos = {
              x: 0,
              y: 0
            };
        }
        return pos;
      },
      regenerateMana: function(entity) {
        var _ref;

        if (((_ref = entity.manaRegenerateDelayTimer) != null ? _ref.delta() : void 0) > entity.manaRegenerateDelay) {
          if (entity.manaRegenerateTimer.delta() > 1) {
            if (entity.mana + entity.manaRegenerateRate <= entity.maxMana) {
              entity.mana += entity.manaRegenerateRate;
            }
            return entity.manaRegenerateTimer.reset();
          }
        }
      },
      changeEntityAnimation: function(entity) {
        if (!ig.input.pressed('attack')) {
          return;
        }
        return entity.currentAnim = entity.anims[entity.weaponManager.activeWeapon + entity.facing];
      },
      spawnWeapon: function(entity) {
        var manaAfterCast, weaponEntity;

        if (!ig.input.pressed('attack')) {
          return;
        }
        entity.weaponManager.weaponAnimTimer = new ig.Timer();
        weaponEntity = ig.game.spawnEntity('Entity' + entity.weaponManager.activeWeapon.substring(0, 1).toUpperCase() + entity.weaponManager.activeWeapon.substring(1), 0, 0, {
          facing: entity.facing
        });
        weaponEntity.pos = this.getWeaponCoordinates(weaponEntity, entity);
        manaAfterCast = (entity.mana != null) && (weaponEntity.cost != null) ? entity.mana - weaponEntity.cost : -1;
        if ((entity.weaponManager.activeWeapon === 'fireball' && manaAfterCast >= 0) || entity.weaponManager.activeWeapon === 'axe') {
          if (entity.weaponManager.activeWeapon === 'fireball') {
            entity.mana -= weaponEntity.cost;
            entity.manaRegenerateDelayTimer = new ig.Timer();
            return weaponEntity.fire();
          }
        }
      }
    });
  });

}).call(this);
