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

        flasher: null
        flashStartTime: 9

        init: (x, y, settings) ->
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