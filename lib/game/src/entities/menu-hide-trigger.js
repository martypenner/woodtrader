ig.module(
	'game.entities.menu-hide-trigger'
)
.requires(
	'game.entities.menu-trigger'
)
.defines(function () {
    EntityMenuHideTrigger = EntityTrigger.extend({
        wait: 0.2,

        check: function (other) {
            this.parent(other, 'hideMenu');
        }
    });
});
