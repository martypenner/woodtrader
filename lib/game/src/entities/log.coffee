`/*`
EntityLog = {}
`*/`

ig.module(
    'game.entities.log'
)
.requires(
    'game.entities.common.static-entity'
)
.defines ->
    EntityLog = EntityStaticEntity.extend
        size:
            x: 54
            y: 19
        type: ig.Entity.TYPE.A
        checkAgainst: ig.Entity.TYPE.A
        collides: ig.Entity.COLLIDES.NEVER
        animSheet: new ig.AnimationSheet 'media/environment/log.png', 54, 19

        # Preload sounds
        pickup: new ig.Sound 'media/sounds/pickup.*'

        lifeTimer: null
        lifeTime: 10

        init: (x, y, settings) ->
            # Set up a timer for this log to be alive
            @lifeTimer = new ig.Timer()

            @parent x, y, settings

        update: ->
            # If the lifetime of this log has passed, kill it
            @kill() if @lifeTimer.delta() > @lifeTime

            @parent()

        # Pickup the log if the player runs into it
        check: (other) ->
            if other.name == 'player'
                @pickup.play()
                other.inventory.addItem 'log'
                @kill()