`/*`
EntityDialog = {}
`*/`

ig.module(
    'game.entities.dialog'
)
.requires(
    'game.entities.common.base-entity'
)
.defines ->
    EntityDialog = EntityBaseEntity.extend
        size:
            x: 1
            y: 1
        collides: ig.Entity.COLLIDES.NEVER
        animSheet: new ig.AnimationSheet 'media/dialogs/dialog1.png', 112, 64

        visible: false

        font: new ig.Font 'media/fonts/arial-12-normal-black.png'
        text: ["I enjoy purchasing\nvarious species of\ntrees!"]
        currentPos: 0
        padding: 5
        cornerSize: width: 4, height: 4

        # ImpactJS canvas context
        ctx: null

        init: (x, y, settings) ->
            @addAnim 'idle', 1, [0]

            # Cache the canvas context
            @ctx = ig.system.context

            @parent x, y, settings

        draw: ->
            return if not @visible

            startX = @pos.x
            startY = @pos.y

            # Calculate width and height for the current text
            width = @font.widthForString @text[@currentPos]
            paddedWidth = width + (@padding * 2)
            height = @font.heightForString @text[@currentPos]
            paddedHeight = height + (@padding * 2)

            # Draw top left and right, and bottom left and right corners
            @animSheet.image.drawTile(startX, startY, 0, @cornerSize.width)
            @animSheet.image.drawTile(startX + @cornerSize.width + paddedWidth, startY, 0, @cornerSize.width, @cornerSize.height, true)
            @animSheet.image.drawTile(startX, startY + @cornerSize.height + paddedHeight, 0, @cornerSize.width, @cornerSize.height, false, true)
            @animSheet.image.drawTile(startX + @cornerSize.width + paddedWidth, startY + @cornerSize.height + paddedHeight, 0, @cornerSize.width, @cornerSize.height, true, true)

            # Draw top and bottom lines
            for i in [0...paddedWidth]
                @animSheet.image.drawTile(startX + @cornerSize.width + i, startY, 4, 1)
                @animSheet.image.drawTile(startX + @cornerSize.width + i, startY + paddedHeight + (@cornerSize.height * 2), 4, 1)

            # Draw left and right lines
            for i in [0...paddedHeight]
                @animSheet.image.drawTile(startX, startY + @cornerSize.height + i, 4, 1)
                @animSheet.image.drawTile(startX + paddedWidth + (@cornerSize.width * 2), startY + @cornerSize.height + i, 4, 1)

            # Fill in the dialog box using simple rectangle drawings (saves from drawing a ton of single-pixel images).
            # I do this by:
            #   1) filling in the main portion of the box, ignoring the gutters introduced by the corner sizes;
            #   2) filling in all 4 gutters.
            @drawRect(startX + @cornerSize.width, startY + @cornerSize.height, paddedWidth, paddedHeight)
            @drawRect(startX + @cornerSize.width, startY + 1, paddedWidth, @cornerSize.height)
            @drawRect(startX + @cornerSize.width, startY + paddedHeight + @cornerSize.height, paddedWidth, @cornerSize.height)
            @drawRect(startX + 1, startY + @cornerSize.height, @cornerSize.width, paddedHeight)
            @drawRect(startX + paddedWidth + @cornerSize.width, startY + @cornerSize.height, @cornerSize.width, paddedHeight)

            # Draw the text
            @font.draw(@text[@currentPos], startX + @cornerSize.width + @padding, startY + @cornerSize.height + @padding)

        drawRect: (x, y, width, height, fillColor = 'white') ->
            @ctx.beginPath()
            @ctx.rect(x, y, width, height)
            @ctx.fillStyle = fillColor
            @ctx.fill()