export class KeyboardManager {
    constructor() {
        this.keys = {};
        // Bind methods to the correct context
        this.keyPress = this.keyPress.bind(this);
        this.keyDown = this.keyDown.bind(this);
        this.keyRealese = this.keyRealese.bind(this);
        // Add event listeners
        document.addEventListener('keydown', this.keyDown);
        document.addEventListener('keypress', this.keyPress);
        document.addEventListener('keyup', this.keyRealese);
    }
    keyPress(e) {
        // on key press
        console.log("Key pressed:", this.keys);
        if (this.keys[e.key]) {
            const key = this.keys[e.key];
            if (key.onPress)
                key.onPress();
        }
    }
    keyDown(e) {
        // while key down
        if (this.keys[e.key]) {
            const key = this.keys[e.key];
            if (key.whileDown)
                key.whileDown();
        }
    }
    keyRealese(e) {
        // key release
        if (this.keys[e.key]) {
            const key = this.keys[e.key];
            if (key.onRealease)
                key.onRealease();
        }
    }
    bind(key, bind) {
        this.keys[key] = bind;
    }
    unBind(key) {
        delete this.keys[key];
    }
}
