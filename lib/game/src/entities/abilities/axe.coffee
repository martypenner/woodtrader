ig.module(
    'game.entities.abilities.axe'
)
.requires(
    'plusplus.abilities.melee'
    'plusplus.helpers.utils'
)
.defines ->

    utils = ig.utils

    ig.EntityAxe = ig.AbilityMelee.extend
        swingSound: new ig.Sound ig.CONFIG.PATH_TO_SOUNDS + 'axe-swing.*'

        # An axe needs to be able to find a target
        canFindTarget: true
        requiresTarget: true

        # Don't block regen
        regenBlocking: false

        rangeX: 5
        rangeY: 5

        damage: 10

        initTypes: ->
            utils.addType(ig.EntityExtended, @, 'typeTargetable', 'TREE')

        execute: ->
            @swingSound.play()
            @parent()
