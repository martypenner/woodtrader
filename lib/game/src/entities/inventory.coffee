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

        removeItem: (item) ->
            @items[item] = 0

        increaseItem: (item) ->
            @items[item] ?= 0
            @items[item] += 1

        decreaseItem: (item) ->
            @items[item] ?= 0
            @items[item] -= 1
            @items[item] = if @items[item] == -1 then 0 else @items[item]

        getCount: (item) ->
            @items[item] ?= 0
