ig.module(
    'game.entities.abilities.fireball-caster'
)
.requires(
    'game.entities.abilities.fireball',
    'plusplus.abilities.ability-shoot',
    'impact.sound',
    'plusplus.entities.explosion'
)
.defines(function () {
    ig.FireballCaster = ig.AbilityShoot.extend({
        spawningEntity: ig.Fireball,

		offsetVelX: 400,
		offsetVelY: 400,

        // Nothing is free
        costActivate: 5,

        castSound: new ig.Sound(ig.CONFIG.PATH_TO_SOUNDS + 'fireball-cast.*'),

        /**
         * Play a sound when casting, and ensure the fireball goes somewhere
         * if the player is standing still
         */
        activate: function (settings) {
            this.castSound.play();

            var projectile = this.parent(settings);

            if (projectile.vel.x === 0 && projectile.vel.y === 0) {
                if (this.entity.facing.x !== 0) {
                    projectile.vel.x = this.entity.facing.x > 0 ? this.offsetVelX : -this.offsetVelX;
                } else if (this.entity.facing.y !== 0) {
                    projectile.vel.y = this.entity.facing.y > 0 ? this.offsetVelY : -this.offsetVelY;
                }
            }
        }
    });
});