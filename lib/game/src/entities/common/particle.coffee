`/*`
EntityParticle = {}
`*/`

ig.module(
    'game.entities.common.particle'
)
.requires(
    'impact.entity'
)
.defines ->
    EntityParticle = ig.Entity.extend
        size: x: 2, y: 2
        maxVel: x: 160, y: 200
        lifetime: 0.7
        fadetime: 1
        idleTimer: null
        bounciness: 0
        vel: x: 100, y: 30
        friction: x: 100, y: 0

        collides: ig.Entity.TYPE.LITE

        colorOffset: 0
        totalColors: 7

        animSheet: new ig.AnimationSheet('media/environment/particle.png', 2, 2)

        init: (x, y, settings) ->
            @parent x, y, settings

            frameId = Math.round(Math.random() * @totalColors) + (@colorOffset * (@totalColors + 1))
            @addAnim 'idle', 0.2, [frameId]

            @vel.x = (Math.random() * 2 - 1) * @vel.x
            @vel.y = (Math.random() * 2 - 1) * @vel.y
            @idleTimer = new ig.Timer()

        update: ->
            if @idleTimer.delta() > @lifetime
                @kill()
                return

            @currentAnim.alpha = @idleTimer.delta().map(
                @lifetime - @fadetime,
                @lifetime,
                1,
                0
            )

            @parent()
