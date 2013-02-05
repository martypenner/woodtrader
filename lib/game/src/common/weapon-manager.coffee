`/*`
WeaponManager = {}
`*/`

ig.module(
    'game.common.weapon-manager'
).requires(
).defines ->
    WeaponManager = ig.Class.extend
        weaponAnimTimer: null
        weaponAnimTime: 0.1

        init: (settings) ->
            for name, value of settings
                @[name] = value

        update: ->
            @switchWeapon() if ig.input.pressed 'switchWeapon'

        switchWeapon: ->
            weapon = @weapons.indexOf(@activeWeapon) + 1
            weapon = 0 if weapon > @weapons.length - 1

            @activeWeapon = @weapons[weapon]

        weaponIsActive: ->
            return not @weaponAnimTimer?

        reset: ->
            @weaponAnimTimer = null if @weaponAnimTimer?.delta() > @weaponAnimTime