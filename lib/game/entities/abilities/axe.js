ig.module(
    'game.entities.abilities.axe'
)
.requires(
    'plusplus.abilities.melee',
    'plusplus.helpers.utils'
)
.defines(function () {

    var utils = ig.utils;

    ig.EntityAxe = ig.AbilityMelee.extend({
        swingSound: new ig.Sound(ig.CONFIG.PATH_TO_SOUNDS + 'axe-swing.*'),

        // An axe needs to be able to find a target, oddly enough
        canFindTarget: true,
        requiresTarget: true,

        // Don't block regen
        regenBlocking: false,

        rangeX: 5,
        rangeY: 5,

        damage: 10,

        initTypes: function () {
            utils.addType(ig.EntityExtended, this, 'typeTargetable', 'TREE');
        },

        execute: function () {
            this.swingSound.play();
            this.parent();
        }
    });
});