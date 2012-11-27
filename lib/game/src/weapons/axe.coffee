`/*`
EntityAxe = {}
`*/`

ig.module(
    'game.entities.weapons.axe'
)
.requires(
    'impact.entity'
)
.defines ->
    EntityAxe = ig.Entity.extend
        size:
            x: 16
            y: 16
        collides: ig.Entity.COLLIDES.NEVER
        type: ig.Entity.TYPE.B
        checkAgainst: ig.Entity.TYPE.A

        swingAxe: new ig.Sound 'media/sounds/axe-hit.*'

        lifeTimer: null

        init: (x, y, settings) ->
            @lifeTimer = new ig.Timer()
            @swingAxe.play()

            # Call the parent constructor
            @parent x, y, settings

        update: ->
            @kill() if @lifeTimer.delta() > 0.2

            @parent()

        check: (other) ->
            if other.entityType == 'tree'
                other.receiveDamage 3.5, @
                @kill()
