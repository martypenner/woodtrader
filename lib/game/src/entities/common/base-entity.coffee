`/*`
EntityBaseEntity = {}
`*/`

ig.module(
    'game.entities.common.base-entity'
)
.requires(
    'plusplus.core.entity'
)
.defines ->
    EntityBaseEntity = ig.EntityExtended.extend
        init: (x, y, settings) ->
            @parent x, y, settings
