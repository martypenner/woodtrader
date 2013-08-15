`/*`
EntityInventoryItem = {}
`*/`

ig.module(
    'game.entities.inventory-item'
)
.requires(
    'game.entities.common.static-entity'
)
.defines ->
    EntityInventoryItem = EntityBaseEntity.extend

        size:
            x: 250
            y: 50
        animSheet: new ig.AnimationSheet 'media/menus/menu-item.png', 250, 50
        collides: ig.Entity.COLLIDES.NEVER

        # Ensure the item gets drawn over everything else
        zIndex: 101

        isVisible: false

        init: (x, y, settings) ->
            @addAnim 'idle', 1, [0]
            @parent x, y, settings

        draw: ->
            @parent() if @isVisible
