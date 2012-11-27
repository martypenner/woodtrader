`/*`
EntityEnemy = {}
`*/`

ig.module(
    'game.entities.enemy'
)
.requires(
    'impact.entity'
)
.defines ->
    EntityEnemy = ig.Entity.extend
        size:
            x: 48
            y: 64
        collides: ig.Entity.COLLIDES.PASSIVE
        type: ig.Entity.TYPE.B
        checkAgainst: ig.Entity.TYPE.A

        animSheet: new ig.AnimationSheet 'media/characters/hero.png', 48, 64

        idleAnimSpeed: 1

        init: (x, y, settings) ->
            # Add animations for the animation sheet
            @addAnim 'idleDown', @idleAnimSpeed, [0]

            # Call the parent constructor
            @parent x, y, settings

        update: ->
            # Call the parent to get physics and movement updates
            @parent()
