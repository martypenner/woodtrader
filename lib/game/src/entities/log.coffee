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

        # Pickup the log if the player runs into it
        check: (other) ->
            if other.name == 'player'
                @pickup.play()
                other.inventory.addItem 'log'
                @kill()