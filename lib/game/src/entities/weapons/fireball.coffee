`/*`
EntityFireball = {}
`*/`

ig.module(
    'game.entities.weapons.fireball'
)
.requires(
    'game.entities.common.base-entity'
)
.defines ->
    EntityFireball = EntityBaseEntity.extend
        size:
            x: 11
            y: 11
        collides: ig.Entity.COLLIDES.NEVER
        type: ig.Entity.TYPE.A
        checkAgainst: ig.Entity.TYPE.BOTH
        animSheet: new ig.AnimationSheet 'media/characters/fireball.png', 11, 11

        # Maximum velocity
        maxVel:
            x: 400
            y: 400

        idleAnimSpeed: 0.06

        init: (x, y, settings) ->
            # Add animations to the animation sheet
            @addAnim 'up', @idleAnimSpeed, [0]
            @addAnim 'down', @idleAnimSpeed, [1]
            @addAnim 'right', @idleAnimSpeed, [2]
            @addAnim 'left', @idleAnimSpeed, [3]

            # Call the parent constructor
            @parent x, y, settings

            # Make the fireball face the right direction
            @currentAnim = @anims[@facing.toLowerCase()]

            # Move!
            @vel = if @vel.x > 0 or @vel.y > 0 then @vel else
                if @facing is 'Up' then x: 0, y: -@maxVel.y
                else if @facing is 'Down' then x: 0, y: @maxVel.y
                else if @facing is 'Right' then x: @maxVel.x, y: 0
                else if @facing is 'Left' then x: -@maxVel.x, y: 0

        update: ->
            @kill() if @vel.x is 0 and @vel.y is 0

            # Call the parent to get physics and movement updates
            @parent()

        check: (other) ->
            other.receiveDamage(50, @)
            @kill()

        handleMovementTrace: (res) ->
            @kill() if res.collision.x or res.collision.y
            @parent(res)
