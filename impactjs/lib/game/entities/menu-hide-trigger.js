ig.module(
	'game.entities.menu-hide-trigger'
)
.requires(
	'game.entities.menu-trigger'
)
.defines(function () {

EntityMenuHideTrigger = EntityMenuTrigger.extend({
    check: function (other) {
        this.parent(other, 'hideMenu');
    }
});

});