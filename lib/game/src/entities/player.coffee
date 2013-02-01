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
    'game.entities.weapons.fireball'
)
.defines ->
    EntityPlayer = EntityBaseEntity.extend
        size:
            x: 16
            y: 20
        offset:
            x: 17
            y: 22
        collides: ig.Entity.COLLIDES.ACTIVE
        type: ig.Entity.TYPE.A
        animSheet: new ig.AnimationSheet 'media/characters/player_v1.png', 50, 50

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
        movingAnimSpeed: 0.1

        # Whether the entity is allowed to move
        movementAllowed: true

        # Store the inventory entity for the player
        inventory: null

        # Timer for the weapon animations
        weaponAnimTimer: null
        weaponAnimTime: 0.1

        # Store the currently equipped weapon
        activeWeapon: 'axe'
        weapons: ['axe', 'fireball']

        health: 50

        # MAGIC!!!
        mana: 50
        maxMana: 50
        manaRegenerateDelay: 3
        manaRegenerateDelayTimer: null
        manaRegenerateRate: 1
        manaRegenerateTimer: null
        fireballManaCost: 5

        # Properties to save between levels
        persistedProperties: [
            'health'
            'mana'
            'manaRegenerateDelayTimer'
            'activeWeapon'
            'inventory'
        ]

        init: (x, y, settings) ->
            # Add animations to the animation sheet
            @addAnim 'idleDown', @idleAnimSpeed, [0]
            @addAnim 'idleUp', @idleAnimSpeed, [7]
            @addAnim 'idleRight', @idleAnimSpeed, [14]
            @addAnim 'idleLeft', @idleAnimSpeed, [21]
            @addAnim 'walkDown', @movingAnimSpeed, [0, 1, 0, 2]
            @addAnim 'walkUp', @movingAnimSpeed, [7, 8, 7, 9]
            @addAnim 'walkRight', @movingAnimSpeed, [14, 15, 14, 16]
            @addAnim 'walkLeft', @movingAnimSpeed, [21, 22, 21, 23]
            @addAnim 'axeDown', @movingAnimSpeed, [3]
            @addAnim 'axeUp', @movingAnimSpeed, [4]
            @addAnim 'axeRight', @movingAnimSpeed, [5]
            @addAnim 'axeLeft', @movingAnimSpeed, [6]
            @addAnim 'fireballDown', @movingAnimSpeed, [10]
            @addAnim 'fireballUp', @movingAnimSpeed, [11]
            @addAnim 'fireballRight', @movingAnimSpeed, [12]
            @addAnim 'fireballLeft', @movingAnimSpeed, [13]

            # Set the entity's default state
            @state = @states.DEFAULT

            @manaRegenerateTimer = new ig.Timer()
            @manaRegenerateDelayTimer = new ig.Timer()

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
            # Mana regeneration every second
            if @manaRegenerateDelayTimer?.delta() > @manaRegenerateDelay
                if @manaRegenerateTimer.delta() > 1
                    @mana += @manaRegenerateRate if @mana + @manaRegenerateRate <= @maxMana
                    @manaRegenerateTimer.reset()

            # Check for button presses and activate the appropriate animation
            @handleButtons()

            # Call the parent to get physics and movement updates
            @parent()

        draw: ->
            if not ig.global.wm
                # Set the inventory's visibility based on whether we're in Weltmeister and the
                # player is trying to access the inventory
                @inventory.isVisible = @state == @states.IN_INVENTORY

            @parent()

        handleButtons: ->
            # Don't move the player if he's not allowed to (e.g. we're in a menu)
            if not @movementAllowed
                @reset()
                return

            @switchWeapon() if ig.input.pressed 'switchWeapon'

            ### Inventory/Menu Navigation ###

            if ig.input.pressed 'inventory'
                @reset()

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

            ### Weapons ###

            if ig.input.pressed 'attack'
                @currentAnim = @anims[@activeWeapon + @facing]
                @weaponAnimTimer = new ig.Timer()

                manaAfterCast = @mana - @fireballManaCost
                if (@activeWeapon is 'fireball' and manaAfterCast >= 0) or @activeWeapon is 'axe'
                    if @activeWeapon is 'fireball'
                        @mana -= @fireballManaCost
                        @manaRegenerateDelayTimer = new ig.Timer()

                    weapon = ig.game.spawnEntity(
                        'Entity' + @activeWeapon.substring(0, 1).toUpperCase() + @activeWeapon.substring(1),
                        0,
                        0,
                        facing: @facing
                    )
                    weapon.pos = @getWeaponCoordinates weapon

            ### Movement ###

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

            # If moving sideways, change the hit box dimensions and offset
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
                @reset() if not ig.input.pressed 'attack'


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

        switchWeapon: ->
            weapon = @weapons.indexOf(@activeWeapon) + 1
            weapon = 0 if weapon > @weapons.length - 1

            @activeWeapon = @weapons[weapon]

        reset: ->
            # Reset the player idle animation if we're not showing the axe swing
            if not @weaponAnimTimer?
                @currentAnim = @anims['idle' + @facing]
            else
                @weaponAnimTimer = null if @weaponAnimTimer.delta() > @weaponAnimTime

            # Cancel all movement
            @vel.x = 0
            @vel.y = 0