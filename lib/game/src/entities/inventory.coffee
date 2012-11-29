`/*`
EntityInventory = {}
`*/`

ig.module(
    'game.entities.inventory'
)
.requires(
    'game.entities.common.static-entity'
)
.defines ->
    EntityInventory = EntityStaticEntity.extend
        size:
            x: 320
            y: 200
        animSheet: new ig.AnimationSheet 'media/menus/menu.png', 320, 200
        collides: ig.Entity.COLLIDES.NEVER

        name: 'inventory'

        # Ensure the inventory gets drawn over everything else
        zIndex: 100

        # Store of the inventory items
        items: ['umbrella', 'shoe']

        isVisible: false

        init: (x, y, settings) ->
            oldItems = @items
            newItems = []

            for oldItem, i in oldItems
                newItem = ig.game.spawnEntity EntityInventoryItem, 0, 0, {name: oldItem}

                newItem.pos =
                    x: (ig.system.width - newItem.size.x) / 2
                    y: (ig.system.height - @size.y) / 2 + (i * 70) + 20

                newItems.push newItem

            # Assign the actual entities to the items array
            @items = newItems

            @parent x, y, settings

        draw: ->
            if @isVisible
                @setItemsVisibility true
                @parent()
            else
                @setItemsVisibility false

        setItemsVisibility: (visible) ->
            for item in @items
                item.isVisible = visible
