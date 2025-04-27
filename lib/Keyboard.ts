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

    keyPress (e: KeyboardEvent) : void {
        // on key press
        var key = this.keys[e.key];
        if(key.onPress) key.onPress();
    }

    keyDown (e: KeyboardEvent) : void {
        // while key down
        var key = this.keys[e.key];
        if(key.whileDown) key.whileDown();
    }

    keyRealese (e: KeyboardEvent) : void {
        // key rel
        var key = this.keys[e.key];
        if(key.onRealease) key.onRealease();
    }

    tick () : void {
        // we can do on down here
    }

    constructor (){
        this.keys = {};
        document.addEventListener('keydown', this.keyDown);
        document.addEventListener('keypress', this.keyPress);
        document.addEventListener('keyup', this.keyRealese);
    }

    bind (key: string, bind: KeyBind) : void {
        this.keys[key] = bind;
    }

    unBind (key: string) : void {
        delete this.keys[key];
    }
}