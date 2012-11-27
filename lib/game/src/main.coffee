WoodTraderGame = {}

ig.module(
    'game.main'
)
.requires(
    'impact.game'
    'impact.font'

    # Debug
    'impact.debug.debug'

    # Plugins
    'plugins.impact-splash-loader'
    'plugins.gui'
    'plugins.director.director'

    # Levels
    'game.levels.market1'

    # Entities
    'game.entities.common.base-entity'
    'game.entities.inventory'
    'game.entities.inventory-item'
    'game.entities.player'
    'game.entities.trader'
    'game.entities.stall'
    'game.entities.menu'
    'game.entities.enemy'
)
.defines ->

    $(window).blur ->
        if ig.system
            ig.music.pause()
            ig.system.stopRunLoop()

    $(window).focus ->
        if ig.system
            ig.music.play()
            ig.system.startRunLoop()

    WoodTraderGame = ig.Game.extend

        # Load a font
        font: new ig.Font('media/fonts/04b03.font.png')

        # Preload music
        bgtune: new ig.Sound('media/music/01-A-Night-Of-Dizzy-Spells.*')

        # Globally store the player entity for performance and ease of reference
        player: null

        # Store a global level director
        director: null

        init: ->
            # Load EaselJS
#            SystemManager.init()

            # Bind keys
            ig.input.bind ig.KEY.LEFT_ARROW, 'left'
            ig.input.bind ig.KEY.RIGHT_ARROW, 'right'
            ig.input.bind ig.KEY.UP_ARROW, 'up'
            ig.input.bind ig.KEY.DOWN_ARROW, 'down'
            ig.input.bind ig.KEY.SPACE, 'attack'
            ig.input.bind ig.KEY.ENTER, 'confirm'
            ig.input.bind ig.KEY.I, 'inventory'

            # Bind mouse events
            ig.input.bind ig.KEY.MOUSE1, 'confirm'

            # Disable the GUI by default
            ig.gui.show = false

            @director = new ig.Director @, LevelMarket1

            # Add and play music
            ig.music.add @bgtune
            # Decrease the volume so the sound effects are heard better
            ig.music.volume = 0.5
            ig.music.play()

            # Load level 1
            @director.loadLevel 0

            # Add GUI elements
            @addGui()

        update: ->
            # Update all entities and backgroundMaps
            @parent()

            # Screen follows the player
            if @player
                x = @player.pos.x - ig.system.width / 2
                y = @player.pos.y - ig.system.height / 2
                mainBgMap = ig.game.getMapByName 'grass'
                mapWidth = mainBgMap.width * mainBgMap.tilesize - ig.system.width
                mapHeight = mainBgMap.height * mainBgMap.tilesize - ig.system.height

                # Ensure that the screen doesn't scroll past the map limits
                x = if x < 0 then 0 else if x > mapWidth then mapWidth else x
                y = if y < 0 then 0 else if y > mapHeight then mapHeight else y

                @screen.x = x
                @screen.y = y

        draw: ->
            # Clear out the main canvas since Easel will have drawn things that Impact doesn’t know about
#            ctx = ig.system.context
#            ctx.setTransform 1, 0, 0, 1, 0, 0
#            ctx.clearRect 0, 0, ig.system.width, ig.system.height

            # Call draw on the parent object to make sure that all draws to the canvas are finalized
            # before telling Easel to update
            @parent()

            ig.gui.draw() if ig.gui.show

            # Calls tick on our SystemManager object, which is the main EaselJS code
            # that handles drawing the non-gameplay elements
#            SystemManager.tick()

        addGui: ->
            ig.gui.element.add
                name: 'inventory'
                group: 'inventory'
                size:
                    x: 47
                    y: 47
                pos:
                    x: 0
                    y: ig.system.height - 47
                state:
                    normal:
                        image: new ig.Image 'media/joystick.png'
                        tile: 2
                        tileSize: 47
                click: ->
                    console.log 'clicked'

    # Start the game
    ig.main '#canvas', WoodTraderGame, 60, 1024, 768, 1, ig.ImpactSplashLoader
