ig.module(
    'game.entities.log'
)
.requires(
    'plusplus.abstractities.particle'
    'game.common.flasher'
)
.defines ->
    ig.EntityLog = ig.Particle.extend
        size:
            x: 25
            y: 25
        type: ig.Entity.TYPE.A
        checkAgainst: ig.Entity.TYPE.A
        collides: ig.Entity.COLLIDES.NEVER
        animSheet: new ig.AnimationSheet 'media/environment/log.png', 36, 25
        animSettings:
            idle:
                frameTime: 0.2
                sequence: [0, 1, 2, 3, 2, 1, 0]

        # Preload sounds
        pickup: new ig.Sound 'media/sounds/pickup.*'

        lifeDuration: 10
        fadeBeforeDeathDuration: 3

        # Pickup the log if the player runs into it
        # TODO: should probably be replaced with something like AbiltityPickUp
        check: (other) ->
            if other.name == 'player'
                @pickup.play()
                other.inventory.addItem 'log'
                @kill()