`/*`
EntityLog = {}
`*/`

ig.module(
    'game.entities.log'
)
.requires(
    'game.entities.common.static-entity'
    'game.common.flasher'
)
.defines ->
    EntityLog = EntityStaticEntity.extend
        size:
            x: 25
            y: 25
        type: ig.Entity.TYPE.A
        checkAgainst: ig.Entity.TYPE.A
        collides: ig.Entity.COLLIDES.NEVER
        animSheet: new ig.AnimationSheet 'media/environment/log.png', 36, 25

        # Preload sounds
        pickup: new ig.Sound 'media/sounds/pickup.*'

        lifeTimer: null
        lifeTime: 10

        flasher: null
        flashStartTime: 9

        init: (x, y, settings) ->
            @addAnim 'idle', 0.2, [0, 1, 2, 3, 2, 1, 0]

            # Set up a timer for this log to be alive
            @lifeTimer = new ig.Timer()

            @flasher = new Flasher(@)

            @parent x, y, settings

        update: ->
            # Start flashing the log if the lifetimer is near the end
            @flasher.startFlash() if @lifeTimer.delta() > @flashStartTime
            # If the lifetime of this log has passed, kill it
            @kill() if @lifeTimer.delta() > @lifeTime

            @parent()

        draw: ->
            @flasher.draw()
            @parent()

        # Pickup the log if the player runs into it
        check: (other) ->
            if other.name == 'player'
                @pickup.play()
                other.inventory.addItem 'log'
                @kill()