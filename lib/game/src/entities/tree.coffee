`/*`
EntityTree = {}
`*/`

ig.module(
    'game.entities.tree'
)
.requires(
    'plusplus.core.entity'
    'game.common.flasher'
    'plusplus.helpers.utils'
    'plusplus.entities.particle-color'
    'plusplus.abstractities.creature'
    'game.entities.log'
)
.defines ->

    utils = ig.utils

    EntityTree = ig.Creature.extend
        size:
            x: 85
            y: 55
        offset:
            x: 65
            y: 155
        collides: ig.Entity.COLLIDES.FIXED
        type: ig.Entity.TYPE.A
        animSheet: new ig.AnimationSheet 'media/environment/tree.png', 220, 211
        animSettings:
            idleX:
                sequence: [0]
                frameTime: 1
        collides: ig.Entity.COLLIDES.FIXED

        # Preload sounds
        treeStrike: new ig.Sound 'media/sounds/tree-strike.*'
        treeFall: new ig.Sound 'media/sounds/tree-fall.*'

        # Percent chance the tree will drop a log after being cut down
        dropLogChance: 75

        canFlipX: true
        canFlipY: false

        health: 10

        # Trees can't move, silly
        canWander: false

        deathSettings:
            spawnCountMax: 30
            spawnSettings:
                animTileOffset: ig.EntityParticleColor.colorOffsets.BROWN

        initTypes: ->
            utils.addType(ig.EntityExtended, @, 'type', 'TREE')

        receiveDamage: (amount, from) ->
            # Play the fx for hitting a tree if the tree won't die from this hit (prevents
            # multiple fx playing simultaneously)
            @treeStrike.play() if @health - amount > 0
            @parent amount, from

        # Play a sound effect when killing this tree and possibly drop a log (teehee)
        kill: ->
            @treeFall.play()

            if (Math.random() * 100) < @dropLogChance
                # Spawn a log in the approx. center of the tree
                ig.game.spawnEntity EntityLog, (@size.x - 25) / 2 + @pos.x, (@size.x - 25) / 2 + @pos.y - 10

            @parent()
