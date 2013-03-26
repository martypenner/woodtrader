`/*`
EntityMenuHideTrigger = {}
`*/`

ig.module(
	'game.entities.menu-hide-trigger'
)
.requires(
	'game.entities.menu-trigger'
)
.defines ->
    EntityMenuHideTrigger = EntityTrigger.extend
        wait: 0.2

        check: (other) ->
            @parent other, 'hideMenu'
