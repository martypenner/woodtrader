`/*`
Flasher = {}
`*/`

ig.module(
    'game.common.flasher'
)
.requires(
    'game.entities.common.static-entity'
)
.defines ->
    Flasher = ig.Class.extend
        flashTimer: null
        flashCurrent: 0
        flashTime: 0.1
        flashAlphas: [
            0.5
            1
            0.5
            1
        ]
        flashReceiver: null

        init: (flashReceiver) ->
            @flashReceiver = flashReceiver

        startFlash: ->
            @flashTimer ?= new ig.Timer @flashTime

        draw: ->
            return if not @flashTimer?

            if @flashTimer.delta() < 0
                @flashReceiver.currentAnim.alpha = @flashTimer.delta().map(
                    0
                    -@flashTimer.target
                    @flashAlphas[@flashCurrent]
                    (if @flashCurrent in [0, 2] then 1 else 0.5)
                )
            else
                if @flashCurrent == 3
                    @flashCurrent = 0
                    @flashTimer = null
                else
                    @flashCurrent++
                    @flashTimer?.reset()