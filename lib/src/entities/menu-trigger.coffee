`/*`
EntityMenuTrigger = {}
`*/`

ig.module(
	'game.entities.menu-trigger'
)
.requires(
	'game.entities.common.trigger'
)
.defines ->
    EntityMenuTrigger = EntityTrigger.extend
        wait: 0.2

        check: (other) ->
            @parent other, 'showMenu'
