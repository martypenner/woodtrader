###
This entity calls the triggeredBy( entity, trigger ) method of each of its
targets. #entity# is the entity that triggered this trigger and #trigger#
is the trigger entity itself.


Keys for Weltmeister:

checks
	Specifies which type of entity can trigger this trigger. A, B or BOTH
	Default: A

wait
	Time in seconds before this trigger can be triggered again. Set to -1
	to specify "never" - e.g. the trigger can only be triggered once.
	Default: -1

target.1, target.2 ... target.n
	Names of the entities whose triggeredBy() method will be called.
###

`/*`
EntityTrigger = {}
`*/`

ig.module(
	'game.entities.common.trigger'
)
.requires(
    'plusplus.core.entity'
)
.defines ->
    EntityTrigger = ig.EntityExtended.extend
        size:
            x: 16
            y: 16

        _wmScalable: true
        _wmDrawBox: true
        _wmBoxColor: 'rgba(196, 255, 0, 0.7)'

        target: null
        wait: -1
        waitTimer: null
        canFire: true

        type: ig.Entity.TYPE.NONE
        checkAgainst: ig.Entity.TYPE.A
        collides: ig.Entity.COLLIDES.NEVER

        init: (x, y, settings) ->
            if settings.checks
                @checkAgainst = ig.Entity.TYPE[settings.checks.toUpperCase()] || ig.Entity.TYPE.A;
                delete settings.check

            @parent x, y, settings
            @waitTimer = new ig.Timer()

        check: (other, functionName) ->
            functionName ?= 'triggeredBy'

            # Suffix the function name with "Trigger"
            if functionName != 'triggeredBy'
                functionName += 'Trigger'

            if @canFire && @waitTimer.delta() >= 0
                if typeof(@target) == 'object'
                    for index, target of @target
                        ent = ig.game.getEntityByName target

                        if ent && typeof(ent[functionName]) == 'function'
                            ent[functionName](other, @)

                if @wait == -1
                    @canFire = false
                else
                    @waitTimer.set @wait

        update: ->
