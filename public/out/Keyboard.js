export class KeyboardManager {
    keyPress(e) {
        // on key press
        var key = this.keys[e.key];
        if (key.onPress)
            key.onPress();
    }
    keyDown(e) {
        // while key down
        var key = this.keys[e.key];
        if (key.whileDown)
            key.whileDown();
    }
    keyRealese(e) {
        // key rel
        var key = this.keys[e.key];
        if (key.onRealease)
            key.onRealease();
    }
    tick() {
        // we can do on down here
    }
    constructor() {
        this.keys = {};
        document.addEventListener('keydown', this.keyDown);
        document.addEventListener('keypress', this.keyPress);
        document.addEventListener('keyup', this.keyRealese);
    }
    bind(key, bind) {
        this.keys[key] = bind;
    }
    unBind(key) {
        delete this.keys[key];
    }
}
