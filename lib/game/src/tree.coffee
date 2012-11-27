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

        treeFall: new ig.Sound 'media/sounds/tree-fall.*'

        entityType: 'tree'

        init: (x, y, settings) ->
            # Add animations for the animation sheet
            @addAnim 'idle', 1000, [0]

            # Call the parent constructor
            @parent x, y, settings

        # Skeleton function to chop a tree down
        chopDown: ->
            @treeFall.play()
            @kill()
