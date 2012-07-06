ig.module(
	'game.entities.menu-trigger'
)
.requires(
	'game.entities.trigger'
)
.defines(function () {

EntityMenuTrigger = EntityTrigger.extend({
    check: function (other) {
        this.parent(other, 'showMenu');
    }
});

});