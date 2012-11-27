`/*`
EntityTree = {}
`*/`

ig.module(
    'game.entities.tree'
)
.requires(
    'game.entities.common.base-entity'
)
.defines ->
    EntityTree = EntityBaseEntity.extend
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

        entityType: 'tree'

        init: (x, y, settings) ->
            # Add animations for the animation sheet
            @addAnim 'idle', 1000, [0]

            # Call the parent constructor
            @parent x, y, settings


        receiveDamage: (amount, from) ->
            # Play the fx for hitting a tree if the tree won't die from this hit (prevents
            # multiple fx playing simultaneously)
            @treeStrike.play() if @health - amount > 0
            @parent amount, from

        # Play a sound effect when killing this tree
        kill: ->
            @treeFall.play()
            @parent()
