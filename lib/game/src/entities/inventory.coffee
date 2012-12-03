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
    EntityInventory = EntityBaseEntity.extend
        size:
            x: 320
            y: 200
        collides: ig.Entity.COLLIDES.NEVER

        # Store of the inventory items
        items: {}

        addItem: (item) ->
            @items[item] ?= 0
            @items[item] += 1
