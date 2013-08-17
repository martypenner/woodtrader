`/*`
EntityStall = {}
`*/`

ig.module(
    'game.entities.stall'
)
.requires(
    'plusplus.core.entity'
)
.defines ->
    EntityStall = ig.EntityExtended.extend
        size:
            x: 128
            y: 60
        offset:
            x: 0
            y: 20
        animSheet: new ig.AnimationSheet 'media/buildings/stall.png', 128, 80
        animSettings:
            idle:
                sequence: [0]
                frameTime: 1
        collides: ig.Entity.COLLIDES.FIXED

        # The associated trader entity. It gets set manually in Weltmeister, and can be null
        # (a stall doesn't have to "own" a trader)
        trader: null

        init: (x, y, settings) ->
            # Call the parent constructor first so all of the entities are drawn and positioned
            @parent x, y, settings

            # Store the associated trader entity
            trader = ig.game.getEntityByName @trader
            @trader = if trader? then trader else null
