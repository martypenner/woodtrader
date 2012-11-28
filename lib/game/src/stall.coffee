`/*`
EntityStall = {}
`*/`

ig.module(
    'game.entities.stall'
)
.requires(
    'game.entities.common.static-entity'
)
.defines ->
    EntityStall = EntityStaticEntity.extend
        size:
            x: 128
            y: 60
        offset:
            x: 0
            y: 20
        animSheet: new ig.AnimationSheet 'media/buildings/stall.png', 128, 80

        # The associated trader entity
        trader: null

        init: (x, y, settings) ->
            # Call the parent constructor first so all of the entities are drawn and positioned
            @parent x, y, settings

            # Store the associated trader entity
            trader = ig.game.getEntityByName @trader
            @trader = if trader? then trader else null
