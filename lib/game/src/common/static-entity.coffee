`/*`
EntityStaticEntity = {}
`*/`

ig.module(
    'game.entities.common.static-entity'
)
.requires(
    'game.entities.common.base-entity'
)
.defines ->
    EntityStaticEntity = EntityBaseEntity.extend
        size:
            x: 8
            y: 8
        collides: ig.Entity.COLLIDES.FIXED

        frame: 0

        init: (x, y, settings) ->
            @addAnim 'idle', 1, [@frame]
            @parent x, y, settings
