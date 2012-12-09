`/*`
EntityLoadLevelTrigger = {}
`*/`

ig.module(
	'game.entities.load-level-trigger'
)
.requires(
	'game.entities.common.trigger'
)
.defines ->
    EntityLoadLevelTrigger = EntityTrigger.extend
        ignoreFirstHit: false
        hitCount: 0

        check: (other) ->
            return if other.name isnt 'player'
            
            @hitCount++
            @parent(other, 'loadLevel') if (@ignoreFirstHit and @hitCount == 2) or not @ignoreFirstHit

