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
            # If not in Weltmeister, set this entity's zIndex to its bottom left corner
            # y position and re-sort all entities
            if not ig.global.wm
                sizeY = if @size? && @size.y? then @size.y else 0
                @zIndex = parseInt(y + sizeY)
                ig.game.sortEntitiesDeferred()

            @parent x, y, settings
