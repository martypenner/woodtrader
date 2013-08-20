ig.module(
    'game.common.weaponizr'
).requires(
).defines(function () {
    Weaponizr = ig.Class.extend({
        activeEntities: [],

        init: function () {
            // Store any entities that can use weapons, based on a property
            for (var i = 0; i < ig.game.entities.length; i++) {
                var entity = ig.game.entities[i];
                if (entity.canUseWeapons) {
                    entity.manaRegenerateTimer = new ig.Timer();
                    entity.manaRegenerateDelayTimer = new ig.Timer();

                    this.activeEntities.push(entity);
                }
            }
        },

        update: function () {
            for (var i = 0; i < this.activeEntities.length; i++) {
                var entity = this.activeEntities[i];
                this.regenerateMana(entity);
                this.changeEntityAnimation(entity);
                this.spawnWeapon(entity);
            }
        },

        getWeaponCoordinates: function (weaponEntity, spawningEntity) {
            pos = {x: 0, y: 0};

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
                    pos = {x: 0, y: 0};
            }

            return pos;
        },

        // Regenerate mana every second
        regenerateMana: function (entity) {
            if (entity.manaRegenerateDelayTimer && entity.manaRegenerateDelayTimer.delta() > entity.manaRegenerateDelay) {
                if (entity.manaRegenerateTimer.delta() > 1) {
                    if (entity.mana + entity.manaRegenerateRate <= entity.maxMana) {
                        entity.mana += entity.manaRegenerateRate;
                    }

                    entity.manaRegenerateTimer.reset();
                }
            }
        },

        // Change the entity's animation based on the active weapon and the direction being faced
        changeEntityAnimation: function (entity) {
            if (!ig.input.pressed('attack')) {
                return;
            }

            entity.currentAnim = entity.anims[entity.weaponManager.activeWeapon + entity.facing];
        },

        // Spawn the appropriate weapon at the entity's position
        spawnWeapon: function (entity) {
            if (!ig.input.pressed('attack')) {
                return;
            }

            entity.weaponManager.weaponAnimTimer = new ig.Timer();

            var weaponEntity = ig.game.spawnEntity(
                'Entity' +
                entity.weaponManager.activeWeapon.substring(0, 1).toUpperCase() +
                entity.weaponManager.activeWeapon.substring(1),
                0,
                0,
                {facing: entity.facing}
            );
            weaponEntity.pos = this.getWeaponCoordinates(weaponEntity, entity);

            var manaAfterCast = entity.mana && weaponEntity.cost ? entity.mana - weaponEntity.cost : -1;

            if ((entity.weaponManager.activeWeapon === 'fireball' && manaAfterCast >= 0) || entity.weaponManager.activeWeapon === 'axe') {
                if (entity.weaponManager.activeWeapon === 'fireball') {
                    entity.mana -= weaponEntity.cost;
                    entity.manaRegenerateDelayTimer = new ig.Timer();

                    weaponEntity.fire();
                }
            }
        }
    });
});