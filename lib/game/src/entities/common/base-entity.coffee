`/*`
EntityBaseEntity = {}
`*/`

ig.module(
    'game.entities.common.base-entity'
)
.requires(
    'impact.entity'
)
.defines ->
    EntityBaseEntity = ig.Entity.extend
        init: (x, y, settings) ->
            @parent x, y, settings
