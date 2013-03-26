`/*`
EntityLevelChange = {}
`*/`

ig.module(
    'game.entities.level-change'
)
.requires(
    'game.entities.common.base-entity'
)
.defines ->
    EntityLevelChange = EntityBaseEntity.extend
        size:
            x: 16
            y: 16
        collides: ig.Entity.COLLIDES.NEVER
        type: ig.Entity.TYPE.NONE

        _wmScalable: true
        _wmDrawBox: true
        _wmBoxColor: 'rgba(196, 255, 0, 0.7)'

        init: (x, y, settings) ->
            # Call the parent constructor
            @parent x, y, settings

        loadLevelTrigger: (other, trigger) ->
            return if not @level?

            ig.music.stop()

            desiredLevel = switch @level
                when 'Market1'
                    ig.music.play 'market'
                    LevelMarket1
                when 'Forest1'
                    ig.music.play 'forest'
                    LevelForest1

            ig.game.director.jumpTo desiredLevel
