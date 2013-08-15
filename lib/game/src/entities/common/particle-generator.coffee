`/*`
EntityParticleGenerator = {}
`*/`

ig.module(
    'game.entities.common.particle-generator'
)
.requires(
    'game.entities.common.particle'
    'plusplus.core.entity'
)
.defines ->
    EntityParticleGenerator = ig.EntityExtended.extend
        lifetime: 1
        callback: null
        particles: 25
        idleTimer: null

        init: (x, y, settings) ->
            @parent x, y, settings

            for [0..@particles]
                ig.game.spawnEntity(
                    EntityParticle,
                    x,
                    y,
                    colorOffset: if settings.colorOffset then settings.colorOffset else 0
                )

            @idleTimer = new ig.Timer()

        update: ->
            if @idleTimer.delta() > @lifetime
                @kill()
                @callback if @callback?
