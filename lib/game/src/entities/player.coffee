`/*`
EntityPlayer = {}
`*/`

ig.module(
    'game.entities.player'
)
.requires(
    'game.entities.common.base-entity'
    'game.entities.inventory'
    'game.entities.weapons.axe'
)
.defines ->
    EntityPlayer = EntityBaseEntity.extend
        size:
            x: 10
            y: 13
        offset:
            x: 2
            y: 6
        collides: ig.Entity.COLLIDES.ACTIVE
        type: ig.Entity.TYPE.A
        animSheet: new ig.AnimationSheet 'media/characters/hero_v2.png', 14, 19

        name: 'player'

        # The possible states this entity can be in
        states:
            DEFAULT: 1
            IN_INVENTORY: 2

        # The current state for this entity
        state: null

        # Last direction the player was facing, so the correct idle animation is shown
        facing: 'Down'

        # Default moving velocity
        velocity: 300

        # Maximum velocity
        maxVel:
            x: 500
            y: 500

        idleAnimSpeed: 1
        movingAnimSpeed: 0.06

        # Whether the entity is allowed to move
        movementAllowed: true

        # Store the inventory entity for the player
        inventory: null

        init: (x, y, settings) ->
            # Add animations for the animation sheet
            @addAnim 'idleDown', @idleAnimSpeed, [0]
            @addAnim 'idleUp', @idleAnimSpeed, [3]
            @addAnim 'idleRight', @idleAnimSpeed, [6]
            @addAnim 'idleLeft', @idleAnimSpeed, [9]
            @addAnim 'walkDown', @movingAnimSpeed, [0, 1, 0, 2]
            @addAnim 'walkUp', @movingAnimSpeed, [3, 4, 3, 5]
            @addAnim 'walkRight', @movingAnimSpeed, [6, 7, 6, 8]
            @addAnim 'walkLeft', @movingAnimSpeed, [9, 10, 9, 11]

            # Set the entity's default state
            @state = @states.DEFAULT

            # Spawn the inventory at 0, 0 and store it, but only if we're not in Weltmeister
            if not ig.global.wm
                @inventory = ig.game.spawnEntity EntityInventory

                # Set inventory position to the center of the screen
                @inventory.pos.x = (ig.system.width - @inventory.size.x) / 2
                @inventory.pos.y = (ig.system.height - @inventory.size.y) / 2

            # Call the parent constructor
            @parent x, y, settings

            # Store the player entity globally for performance and ease of reference
            ig.game.player = @

        update: ->
            # Check for button presses and activate the appropriate animation
            @handleButtons()

            # Call the parent to get physics and movement updates
            @parent()

        draw: ->
            if not ig.global.wm
                # If not in Weltmeister, make the player move behind or in front of nearby entities
                # based on the position of its bottom corner
                @zIndex = parseInt(@pos.y + @size.y)
                ig.game.sortEntitiesDeferred()

                # Set the inventory's visibility based on whether we're in Weltmeister and the
                # player is trying to access the inventory
                @inventory.isVisible = @state == @states.IN_INVENTORY

            @parent()

        handleButtons: ->
            ### Inventory/Menu Navigation ###

            if ig.input.pressed 'inventory'
                # Cancel all movement and animation
                @currentAnim = @anims['idle' + @facing]
                @vel.x = 0
                @vel.y = 0

                # If we're already in the inventory menu, close the menu
                if @state == @states.IN_INVENTORY
                    @movementAllowed = true
                    @state = @states.DEFAULT
                # Otherwise, bring up the inventory menu
                else
                    @movementAllowed = false
                    @state = @states.IN_INVENTORY

            # If trying to access inventory, use the keys to navigate the menu
    #        if @state == @states.IN_INVENTORY
                # Check for keypresses to navigate

            # Don't move the player if he's not allowed to (e.g. we're in a menu)
            return if not @movementAllowed

            ### Weapons ###

            if ig.input.pressed 'attack'
                axe = ig.game.spawnEntity 'EntityAxe'
                axe.pos = @getWeaponCoordinates axe

            ### Movement ###

            # If moving sideways, change the hit box dimensions and offset
            if ig.input.state 'up'
                @currentAnim = @anims.walkUp
                @facing = 'Up'
                @vel.x = 0
                @vel.y = -@velocity

                if ig.input.state 'right'
                    @vel.x = @velocity
                else if ig.input.state 'left'
                    @vel.x = -@velocity

            else if ig.input.state 'down'
                @currentAnim = @anims.walkDown
                @facing = 'Down'
                @vel.x = 0
                @vel.y = @velocity

                if ig.input.state 'right'
                    @vel.x = @velocity
                else if ig.input.state 'left'
                    @vel.x = -@velocity

            else if ig.input.state 'left'
                @currentAnim = @anims.walkLeft
                @facing = 'Left'
                @vel.x = -@velocity
                @vel.y = 0

            else if ig.input.state 'right'
                @currentAnim = @anims.walkRight
                @facing = 'Right'
                @vel.x = @velocity
                @vel.y = 0

            else
                # Stop all movement and show the correct idle animation for
                # the direction the player is facing
                @currentAnim = @anims['idle' + @facing]
                @vel.x = 0
                @vel.y = 0

        getWeaponCoordinates: (weaponEntity) ->
            pos = x: 0, y: 0

            switch @facing
                when 'Up'
                    pos.x = @pos.x
                    pos.y = @pos.y - weaponEntity.size.y
                when 'Down'
                    pos.x = @pos.x
                    pos.y = @pos.y + @size.y
                when 'Left'
                    pos.x = @pos.x - weaponEntity.size.x
                    pos.y = @pos.y
                when 'Right'
                    pos.x = @pos.x + @size.x
                    pos.y = @pos.y

            return pos
