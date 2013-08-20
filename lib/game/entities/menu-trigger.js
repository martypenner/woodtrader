ig.module(
	'game.entities.menu-trigger'
)
.requires(
    'plusplus.core.entity'
)
.defines(function () {
    EntityMenuTrigger = EntityTrigger.extend({
        wait: 0.2,

        check: function (other) {
            this.parent(other, 'showMenu');
        }
    });
});
