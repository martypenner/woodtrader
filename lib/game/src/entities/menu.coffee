`/*`
EntityMenu = {}
`*/`

ig.module(
    'game.entities.menu'
)
.requires(
    'game.entities.common.static-entity'
)
.defines ->
    EntityMenu = EntityStaticEntity.extend
        size:
            x: 128
            y: 80
        collides: ig.Entity.COLLIDES.NEVER

        animSheet: new ig.AnimationSheet 'media/buildings/stall.png', 128, 80

        # Whether the menu should be shown on the next draw
        isVisible: false

        draw: ->
            if @isVisible
                ig.game.font.draw 'Beluga whales go fishing in the deep blue see?', 100, 100

            @parent()

        # Show menu if the player triggered it
        showMenuTrigger: (other, trigger) ->
            @isVisible = true if other.name == 'player'

        # Hide menu if the player triggered it
        hideMenuTrigger: (other, trigger) ->
            @isVisible = false if other.name == 'player'
