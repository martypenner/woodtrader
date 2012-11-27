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
        # Set this entity's zIndex to its bottom left corner y position and re-sort all entities
        init: (x, y, settings) ->
            if not ig.global.wm
                sizeY = if @size? && @size.y? then @size.y else 0
                this.zIndex = parseInt(y + sizeY)
                ig.game.sortEntitiesDeferred()

            @parent x, y, settings
