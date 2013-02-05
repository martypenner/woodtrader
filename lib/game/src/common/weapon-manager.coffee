`/*`
WeaponManager = {}
`*/`

ig.module(
    'game.common.weapon-manager'
).requires(
    'game.entities.common.static-entity'
).defines ->
    WeaponManager = ig.Class.extend
        activeEntities: []

        init: ->
            # Store any entities that can use weapons, based on a property
            for entity in ig.game.entities
                if entity.canUseWeapons?
                    entity.weaponAnimTime = 0.1
                    entity.manaRegenerateTimer = new ig.Timer()
                    entity.manaRegenerateDelayTimer = new ig.Timer()

                    @activeEntities.push entity

        # Update
        update: ->
            for entity in @activeEntities
                @regenerateMana(entity)
                @changeEntityAnimation(entity)
                @spawnWeapon(entity)

        getWeaponCoordinates: (weaponEntity, spawningEntity) ->
            pos = x: 0, y: 0

            switch spawningEntity.facing
                when 'Up'
                    pos.x = spawningEntity.pos.x
                    pos.y = spawningEntity.pos.y - weaponEntity.size.y
                when 'Down'
                    pos.x = spawningEntity.pos.x
                    pos.y = spawningEntity.pos.y + weaponEntity.size.y
                when 'Left'
                    pos.x = spawningEntity.pos.x - weaponEntity.size.x
                    pos.y = spawningEntity.pos.y
                when 'Right'
                    pos.x = spawningEntity.pos.x + spawningEntity.size.x
                    pos.y = spawningEntity.pos.y

            return pos

        # Regenerate mana every second
        regenerateMana: (entity) ->
            if entity.manaRegenerateDelayTimer?.delta() > entity.manaRegenerateDelay
                if entity.manaRegenerateTimer.delta() > 1
                    entity.mana += entity.manaRegenerateRate if entity.mana + entity.manaRegenerateRate <= entity.maxMana
                    entity.manaRegenerateTimer.reset()

        # Change the entity's animation based on the active weapon and the direction being faced
        changeEntityAnimation: (entity) ->
            return if not ig.input.pressed 'attack'

            entity.currentAnim = entity.anims[entity.activeWeapon + entity.facing]

        # Spawn the appropriate weapon at the entity's position
        spawnWeapon: (entity) ->
            return if not ig.input.pressed 'attack'

            entity.weaponAnimTimer = new ig.Timer()

            weaponEntity = ig.game.spawnEntity(
                'Entity' +
                entity.activeWeapon.substring(0, 1).toUpperCase() +
                entity.activeWeapon.substring(1),
                0,
                0,
                facing: entity.facing
            )
            weaponEntity.pos = @getWeaponCoordinates weaponEntity, entity

            manaAfterCast = if entity.mana? and weaponEntity.cost? then entity.mana - weaponEntity.cost else -1

            if (entity.activeWeapon is 'fireball' and manaAfterCast >= 0) or entity.activeWeapon is 'axe'
                if entity.activeWeapon is 'fireball'
                    entity.mana -= weaponEntity.cost
                    entity.manaRegenerateDelayTimer = new ig.Timer()

                    weaponEntity.fire()