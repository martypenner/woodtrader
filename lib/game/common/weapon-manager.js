ig.module(
    'game.common.weapon-manager'
).requires(
).defines(function () {
    WeaponManager = ig.Class.extend({
        weaponAnimTimer: null,
        weaponAnimTime: 0.1,

        init: function (settings) {
            for (var name in settings) {
                this[name] = settings[name];
            }
        },

        update: function () {
            if (ig.input.pressed('switchWeapon')) {
                this.switchWeapon();
            }
        },

        switchWeapon: function () {
            var weapon = this.weapons.indexOf(this.activeWeapon) + 1;
            weapon = weapon > this.weapons.length - 1 ? 0 : weapon;

            this.activeWeapon = this.weapons[weapon];
        },

        weaponIsActive: function () {
            return !this.weaponAnimTimer;
        },

        reset: function () {
            this.weaponAnimTimer = this.weaponAnimTimer && (this.weaponAnimTimer.delta() > this.weaponAnimTime) ? null : this.weaponAnimTimer;
        }
    });
});