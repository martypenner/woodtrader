ig.module(
    'game.entities.tree'
)
.requires(
    'plusplus.core.entity',
    'game.common.flasher',
    'plusplus.helpers.utils',
    'plusplus.entities.particle-color',
    'plusplus.abstractities.creature',
    'game.entities.log'
)
.defines(function () {

    var utils = ig.utils;

    EntityTree = ig.Creature.extend({
        size: {
            x: 85,
            y: 55
        },
        offset: {
            x: 65,
            y: 155
        },
        collides: ig.Entity.COLLIDES.FIXED,
        type: ig.Entity.TYPE.A,
        animSheet: new ig.AnimationSheet('media/environment/tree.png', 220, 211),
        animSettings: {
            idleX: {
                sequence: [0],
                frameTime: 1
            }
        },

        // Preload sounds
        treeStrike: new ig.Sound('media/sounds/tree-strike.*'),
        treeFall: new ig.Sound('media/sounds/tree-fall.*'),

        // Percent chance the tree will drop a log after being cut down
        dropLogChance: 75,

        canFlipX: true,
        canFlipY: false,

        health: 10,

        // Trees can't move, silly
        canWander: false,

        deathSettings: {
            spawnCountMax: 30,
            spawnSettings: {
                animTileOffset: ig.EntityParticleColor.colorOffsets.BROWN
            }
        },

        initTypes: function () {
            utils.addType(ig.EntityExtended, this, 'type', 'TREE');
        },

        receiveDamage: function (amount, from) {
            // Play the fx for hitting a tree if the tree won't die from this hit (prevents
            // multiple fx playing simultaneously)
            if (this.health - amount > 0) {
                this.treeStrike.play();
            }

            this.parent(amount, from);
        },

        // Play a sound effect when killing this tree and possibly drop a log (teehee)
        kill: function () {
            this.treeFall.play();

            if ((Math.random() * 100) < this.dropLogChance) {
                // Spawn a log in the approx. center of the tree
                ig.game.spawnEntity(EntityLog, (this.size.x - 25) / 2 + this.pos.x, (this.size.x - 25) / 2 + this.pos.y - 10);
            }

            this.parent();
        }
    });
});