`/*`
EntityTree = {}
`*/`

ig.module(
    'game.entities.tree'
)
.requires(
    'game.entities.common.static-entity'
)
.defines ->
    EntityTree = EntityStaticEntity.extend
        size:
            x: 85
            y: 55
        offset:
            x: 65
            y: 155
        collides: ig.Entity.COLLIDES.FIXED
        type: ig.Entity.TYPE.A
        animSheet: new ig.AnimationSheet 'media/environment/tree.png', 220, 211

        # Preload sounds
        treeStrike: new ig.Sound 'media/sounds/tree-strike.*'
        treeFall: new ig.Sound 'media/sounds/tree-fall.*'

        # Percent chance the tree will drop a log after being cut down
        dropLogChance: 30

        flashTimer: null
        flashCurrent: 0
        flashTime: 0.1
        flashAlphas: [
            0.5
            1
            0.5
            1
        ]

        entityType: 'tree'

        receiveDamage: (amount, from) ->
            @flash()

            # Play the fx for hitting a tree if the tree won't die from this hit (prevents
            # multiple fx playing simultaneously)
            @treeStrike.play() if @health - amount > 0
            @parent amount, from

        # Play a sound effect when killing this tree
        kill: ->
            @treeFall.play()

            if (Math.random() * 100) < @dropLogChance
                ig.game.spawnEntity EntityLog, @pos.x, @pos.y

            @parent()

        flash: ->
            @flashTimer = new ig.Timer @flashTime

        draw: ->
            if @flashTimer?.delta() < 0
                @currentAnim.alpha = @flashTimer.delta().map(
                    0
                    -@flashTimer.target
                    @flashAlphas[@flashCurrent]
                    (if @flashCurrent in [0, 2] then 1 else 0.5)
                )
            else
                if @flashCurrent == 3
                    @flashCurrent = 0
                    @flashTimer = null
                else
                    @flashCurrent++
                    @flashTimer?.reset()

            @parent()