ig.module(
    'game.common.flasher'
)
.requires(
)
.defines(function () {
    Flasher = ig.Class.extend({
        flashTimer: null,
        flashCurrent: 0,
        flashTime: 0.1,
        flashAlphas: [
            0.5,
            1,
            0.5,
            1
        ],
        flashReceiver: null,

        init: function (flashReceiver) {
            this.flashReceiver = flashReceiver;
        },

        startFlash: function () {
            this.flashTimer = this.flashTimer || new ig.Timer(this.flashTime);
        },

        draw: function () {
            if (!this.flashTimer) {
                return;
            }

            if (this.flashTimer.delta() < 0) {
                this.flashReceiver.currentAnim.alpha = this.flashTimer.delta().map(
                    0,
                    -this.flashTimer.target,
                    this.flashAlphas[this.flashCurrent],
                    (this.flashCurrent == 0 || this.flashCurrent == 2 ? 1 : 0.5)
                );
            } else {
                if (this.flashCurrent == 3) {
                    this.flashCurrent = 0;
                    this.flashTimer = null;
                } else {
                    this.flashCurrent++;

                    if (this.flashTimer) {
                        this.flashTimer.reset();
                    }
                }
            }
        }
    });
});