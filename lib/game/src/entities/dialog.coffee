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
        animSheet: new ig.AnimationSheet 'media/dialogs/dialog-lines.png', 1, 1
        animSettings:
            idle:
                sequence: [0]
                frameTime: 1

        lines: new ig.Image 'media/dialogs/dialog-lines.png'
        corners: new ig.Image 'media/dialogs/dialog-corners.png'

        visible: false

        font: new ig.Font 'media/fonts/arial-12-normal-black.png'
        text: []
        currentPos: 0
        padding: 5
        cornerSize: width: 4, height: 4

        # ImpactJS canvas context
        ctx: null

        init: (x, y, settings) ->
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
            @corners.drawTile(startX, startY, 0, @cornerSize.width)
            @corners.drawTile(startX + @cornerSize.width + paddedWidth, startY, 0, @cornerSize.width, @cornerSize.height, true)
            @corners.drawTile(startX, startY + @cornerSize.height + paddedHeight, 0, @cornerSize.width, @cornerSize.height, false, true)
            @corners.drawTile(startX + @cornerSize.width + paddedWidth, startY + @cornerSize.height + paddedHeight, 0, @cornerSize.width, @cornerSize.height, true, true)

            # Draw top, bottom, right, and left lines
            @lines.drawTile(startX + @cornerSize.width, startY, 0, paddedWidth, 1)
            @lines.drawTile(startX + @cornerSize.width, startY + paddedHeight + (@cornerSize.height * 2), 0, paddedWidth, 1)
            @lines.drawTile(startX, startY + @cornerSize.height, 0, 1, paddedHeight)
            @lines.drawTile(startX + paddedWidth + (@cornerSize.width * 2), startY + @cornerSize.height, 0, 1, paddedHeight)

            # Fill in the dialog box using simple rectangle drawings (saves from drawing a ton of single-pixel images).
            # I do this by:
            #   1) filling in the main portion of the box, ignoring the gutters introduced by the corner sizes;
            #   2) filling in all 4 gutters.
            @drawRect(startX + @cornerSize.width, startY + @cornerSize.height, paddedWidth, paddedHeight)
            @drawRect(startX + @cornerSize.width - 1, startY + 1, paddedWidth + 2, @cornerSize.height)
            @drawRect(startX + @cornerSize.width - 1, startY + paddedHeight + @cornerSize.height, paddedWidth + 1, @cornerSize.height)
            @drawRect(startX + 1, startY + @cornerSize.height, @cornerSize.width, paddedHeight)
            @drawRect(startX + paddedWidth + @cornerSize.width - 1, startY + @cornerSize.height, @cornerSize.width + 1, paddedHeight)

            # Draw the text
            @font.draw(@text[@currentPos], startX + @cornerSize.width + @padding, startY + @cornerSize.height + @padding)

        drawRect: (x, y, width, height, fillColor = 'white') ->
            @ctx.fillStyle = fillColor
            @ctx.fillRect(x, y, width, height)
