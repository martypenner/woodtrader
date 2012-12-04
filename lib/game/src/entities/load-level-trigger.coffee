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
        check: (other) ->
            @parent other, 'loadLevel'
