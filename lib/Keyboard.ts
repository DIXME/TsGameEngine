import { GameObject2d } from "./GameObject.js";
import { Graphics } from "./Graphics.js";
import { Vec2 } from "./Vectors.js";
import { Color } from "./Colors.js";


export type KeyBind = {
    down?: boolean
    onPress?: Function,
    onRealease?: Function,
    whileDown?: Function
};

export type KeyBinds = Record<string, KeyBind>;
 
export class KeyboardManager extends GameObject2d {
    keys: KeyBinds;
  
    constructor() {
      super(new Vec2(0, 0), 0, new Color(0, 0, 0));
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
        key.down = true
      }
    }
  
    keyDown(e: KeyboardEvent): void {
      // while key down
      if (this.keys[e.key]) {
        const key = this.keys[e.key];
        key.down = true
      }
    }
  
    keyRealese(e: KeyboardEvent): void {
      // key release
      if (this.keys[e.key]) {
        const key = this.keys[e.key];
        key.down = false
      }
    }
  
    tick(g: Graphics) {
      var keys = Object.keys(this.keys)
      keys.forEach((k, i) => {
        if (this.keys[k].down) {
          if(this.keys[k].whileDown) this.keys[k].whileDown()
        }
      })
    }
  
    bind(key: string, bind: KeyBind): void {
      this.keys[key] = bind;
    }
  
    unBind(key: string): void {
      delete this.keys[key];
    }
}