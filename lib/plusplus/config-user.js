ig.module(
    'plusplus.config-user'
)
.defines(function () {

    /**
     * User configuration of Impact++.
     * <span class="alert alert-info"><strong>Tip:</strong> it is recommended to modify this configuration file!</span>
     * @example
     * // in order to add your own custom configuration to Impact++
     * // edit the file defining ig.CONFIG_USER, 'plusplus/config-user.js'
     * // ig.CONFIG_USER is never modified by Impact++ (it is strictly for your use)
     * // ig.CONFIG_USER is automatically merged over Impact++'s config
     * @static
     * @readonly
     * @memberof ig
     * @namespace ig.CONFIG_USER
     * @author Collin Hover - collinhover.com
     **/
    ig.CONFIG_USER = {
        GAME_WIDTH: 960,
        GAME_HEIGHT: 720,
        TOP_DOWN: true,
        ENTITY: {
            CAN_FLIP_X: false,
            CAN_FLIP_Y: false
        },
        CHARACTER: {
            CAN_JUMP: false,
            CAN_CLIMB: false
        },
        PATH_TO_SOUNDS: 'media/sounds/',
        PATH_TO_CHARACTERS: 'media/characters/',
        PATH_TO_MUSIC: 'media/music/'
    };
});