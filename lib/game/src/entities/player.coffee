`/*`
EntityPlayer = {}
`*/`

ig.module(
    'game.entities.player'
)
.requires(
    'plusplus.abstractities.player'
    'game.entities.abilities.fireball-caster'
    'game.entities.abilities.axe'
    'game.entities.inventory'
    'game.common.weapon-manager'
)
.defines ->
    EntityPlayer = ig.Player.extend
        size:
            x: 16
            y: 20
        offset:
            x: 17
            y: 22
        collides: ig.Entity.COLLIDES.ACTIVE
        type: ig.Entity.TYPE.A
        animSheet: new ig.AnimationSheet ig.CONFIG.PATH_TO_CHARACTERS + 'player_v1.png', 50, 50
        animFrameTime: 0.1
        animInit: 'idleDown'
        animSettings:
            idleDown:
                sequence: [0]
                frameTime: 1
            idleUp:
                sequence: [7]
                frameTime: 1
            idleRight:
                sequence: [14]
                frameTime: 1
            idleLeft:
                sequence: [21]
                frameTime: 1
            moveDown:
                sequence: [0, 1, 0, 2]
            moveUp:
                sequence: [7, 8, 7, 9]
            moveRight:
                sequence: [14, 15, 14, 16]
            moveLeft:
                sequence: [21, 22, 21, 23]
            axeDown:
                sequence: [3]
            axeUp:
                sequence: [4]
            axeRight:
                sequence: [5]
            axeLeft:
                sequence: [6]
            fireballDown:
                sequence: [10]
            fireballUp:
                sequence: [11]
            fireballRight:
                sequence: [12]
            fireballLeft:
                sequence: [13]

        # The possible states this entity can be in
        states:
            DEFAULT: 1
            IN_INVENTORY: 2

        # The current state for this entity
        state: null

        maxVelGrounded:
            x: 250
            y: 250
        speed:
            x: 10000
            y: 10000

        # Whether the entity is allowed to move
        movementAllowed: true

        # Store the inventory entity for the player
        inventory: null

        # Health and MAGIC!!!
        health: 50
        energy: 50
        energyMax: 50
        regenHealth: false
        regen: true
        regenRateEnergy: 1
        regenDelay: 0.8
        persistent: true

        activeWeapon: null
        activeWeaponIndex: 0
        weapons: [
            'axe'
            'fireball'
        ]

        # Properties to save between levels
        persistedProperties: [
            'health'
            'mana'
            'manaRegenerateDelayTimer'
            'weaponManager'
            'inventory'
        ]

        initProperties: ->
            @parent()

            # Set the entity's default state
            @state = @states.DEFAULT

            # Spawn the inventory at 0, 0 and store it, but only if we're not in Weltmeister
            if not ig.global.wm
                @inventory = ig.game.spawnEntity EntityInventory

                # Set inventory position to the center of the screen
                @inventory.pos.x = (ig.system.width - @inventory.size.x) / 2
                @inventory.pos.y = (ig.system.height - @inventory.size.y) / 2

            # Store the player entity globally for performance and ease of reference
            ig.global.player = @

            # Shoot fireballs and swing axes like a pro
            @axe = new ig.EntityAxe(@)
            @fireball = new ig.FireballCaster(@)
            @activeWeapon = @[@weapons[@activeWeaponIndex]]

            @abilities.addDescendants([@fireball, @axe])

        spawn: ->
            @parent()

            # Face right
            @facing = {x: 1, y: 0}

        updateChanges: ->
            @parent()

            # Check for button presses and activate the appropriate animation
            @handleButtons()

        draw: ->
            if not ig.global.wm
                # Set the inventory's visibility based on whether we're in Weltmeister and the
                # player is trying to access the inventory
                @inventory.isVisible = @state == @states.IN_INVENTORY

            @parent()

        handleButtons: ->
            # Don't move the player if he's not allowed to (e.g. we're in a menu)
            if not @movementAllowed
                @resetAnims()
                return

            if ig.input.pressed 'switchWeapon'
                @activeWeaponIndex++
                @activeWeaponIndex = if not @weapons[@activeWeaponIndex]? then 0 else @activeWeaponIndex
                @activeWeapon = @[@weapons[@activeWeaponIndex]]

            if ig.input.pressed 'attack'
                if @facing.x != 0
                    shootX = if @facing.x > 0 then @pos.x + @size.x else @pos.x
                else
                    shootX = @pos.x + @size.x * 0.5

                if @facing.y != 0
                    shootY = if @facing.y > 0 then @pos.y + @size.y else @pos.y
                else
                    shootY = @pos.y + @size.y * 0.5

                @activeWeapon.execute(x: shootX, y: shootY)

            ### Inventory/Menu Navigation ###

            if ig.input.pressed 'inventory'
                @resetAnims()

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

        resetAnims: ->
            if @weaponManager.weaponIsActive()
                @weaponManager.reset()
