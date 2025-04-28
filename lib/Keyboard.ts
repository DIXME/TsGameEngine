export type KeyBind = {
    onPress?: Function,
    onRealease?: Function,
    whileDown?: Function
};

/**
 * keybindexample = {
 *  'a': {
 *    onPress: () => console.log(down)
 *  }
 * }
 */


export type KeyBinds = Record<string, KeyBind>;

export class KeyboardManager {
    keys: KeyBinds;

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

    keyPress(e: KeyboardEvent): void {
        // on key press
        if (this.keys[e.key]) {
            const key = this.keys[e.key];
            if (key.onPress) key.onPress();
        }
    }

    keyDown(e: KeyboardEvent): void {
        // while key down
        if (this.keys[e.key]) {
            const key = this.keys[e.key];
            if (key.whileDown) key.whileDown();
        }
    }

    keyRealese(e: KeyboardEvent): void {
        // key release
        if (this.keys[e.key]) {
            const key = this.keys[e.key];
            if (key.onRealease) key.onRealease();
        }
    }

    bind(key: string, bind: KeyBind): void {
        this.keys[key] = bind;
    }

    unBind(key: string): void {
        delete this.keys[key];
    }
}