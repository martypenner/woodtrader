`/*`
EntityTree = {}
`*/`

ig.module(
    'game.entities.tree'
)
.requires(
    'game.entities.common.static-entity'
    'game.common.flasher'
)
.defines ->
    EntityTree = EntityStaticEntity.extend
        size:
            x: 85
            y: 55
        offset:
            x: 65
            y: 155
        collides: ig.Entity.COLLIDES.FIXED
        type: ig.Entity.TYPE.A
        animSheet: new ig.AnimationSheet 'media/environment/tree.png', 220, 211

        # Preload sounds
        treeStrike: new ig.Sound 'media/sounds/tree-strike.*'
        treeFall: new ig.Sound 'media/sounds/tree-fall.*'

        # Percent chance the tree will drop a log after being cut down
        dropLogChance: 75

        flasher: null

        entityType: 'tree'

        init: (x, y, settings) ->
            @flasher = new Flasher @
            @parent x, y, settings

        receiveDamage: (amount, from) ->
            @flasher.startFlash()

            # Play the fx for hitting a tree if the tree won't die from this hit (prevents
            # multiple fx playing simultaneously)
            @treeStrike.play() if @health - amount > 0
            @parent amount, from

        # Play a sound effect when killing this tree
        kill: ->
            @treeFall.play()

            if (Math.random() * 100) < @dropLogChance
                # Spawn a log in the approx. center of the tree
                ig.game.spawnEntity EntityLog, (@size.x - 25) / 2 + @pos.x, (@size.x - 25) / 2 + @pos.y - 10

            @parent()

        draw: ->
            @flasher.draw()
            @parent()