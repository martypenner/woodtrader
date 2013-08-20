ig.module(
    'game.entities.dialog'
)
.requires(
    'plusplus.core.entity'
)
.defines(function () {
    EntityDialog = ig.EntityExtended.extend({
        size: {
            x: 1,
            y: 1
        },
        collides: ig.Entity.COLLIDES.NEVER,
        animSheet: new ig.AnimationSheet('media/dialogs/dialog-lines.png', 1, 1),
        animSettings: {
            idle: {
                sequence: [0],
                frameTime: 1
            }
        },

        lines: new ig.Image('media/dialogs/dialog-lines.png'),
        corners: new ig.Image('media/dialogs/dialog-corners.png'),

        visible: false,

        font: new ig.Font(ig.CONFIG.PATH_TO_FONTS + 'media/fonts/arial-12-normal-black.png'),
        text: [],
        currentPos: 0,
        padding: 5,
        cornerSize: {
            width: 4,
            height: 4
        },

        // ImpactJS canvas context
        ctx: null,

        init: function (x, y, settings) {
            // Cache the canvas context
            this.ctx = ig.system.context;

            this.parent(x, y, settings);
        },

        draw: function () {
            if (!this.visible) {
                return;
            }

            var startX = this.pos.x;
            var startY = this.pos.y;

            // Calculate width and height for the current text
            var width = this.font.widthForString(this.text[this.currentPos]);
            var paddedWidth = width + (this.padding * 2);
            var height = this.font.heightForString(this.text[this.currentPos]);
            var paddedHeight = height + (this.padding * 2);

            // Draw top left and right, and bottom left and right corners
            this.corners.drawTile(startX, startY, 0, this.cornerSize.width);
            this.corners.drawTile(startX + this.cornerSize.width + paddedWidth, startY, 0, this.cornerSize.width, this.cornerSize.height, true);
            this.corners.drawTile(startX, startY + this.cornerSize.height + paddedHeight, 0, this.cornerSize.width, this.cornerSize.height, false, true);
            this.corners.drawTile(startX + this.cornerSize.width + paddedWidth, startY + this.cornerSize.height + paddedHeight, 0, this.cornerSize.width, this.cornerSize.height, true, true);

            // Draw top, bottom, right, and left lines
            this.lines.drawTile(startX + this.cornerSize.width, startY, 0, paddedWidth, 1);
            this.lines.drawTile(startX + this.cornerSize.width, startY + paddedHeight + (this.cornerSize.height * 2), 0, paddedWidth, 1);
            this.lines.drawTile(startX, startY + this.cornerSize.height, 0, 1, paddedHeight);
            this.lines.drawTile(startX + paddedWidth + (this.cornerSize.width * 2), startY + this.cornerSize.height, 0, 1, paddedHeight);

            // Fill in the dialog box using simple rectangle drawings (saves from drawing a ton of single-pixel images).
            // I do this by:
            //   1) filling in the main portion of the box, ignoring the gutters introduced by the corner sizes;
            //   2) filling in all 4 gutters.
            this.drawRect(startX + this.cornerSize.width, startY + this.cornerSize.height, paddedWidth, paddedHeight);
            this.drawRect(startX + this.cornerSize.width - 1, startY + 1, paddedWidth + 2, this.cornerSize.height);
            this.drawRect(startX + this.cornerSize.width - 1, startY + paddedHeight + this.cornerSize.height, paddedWidth + 1, this.cornerSize.height);
            this.drawRect(startX + 1, startY + this.cornerSize.height, this.cornerSize.width, paddedHeight);
            this.drawRect(startX + paddedWidth + this.cornerSize.width - 1, startY + this.cornerSize.height, this.cornerSize.width + 1, paddedHeight);

            // Draw the text
            this.font.draw(this.text[this.currentPos], startX + this.cornerSize.width + this.padding, startY + this.cornerSize.height + this.padding);
        },

        drawRect: function (x, y, width, height, fillColor) {
            fillColor = fillColor || 'white';

            this.ctx.fillStyle = fillColor;
            this.ctx.fillRect(x, y, width, height);
        }
    });
});
