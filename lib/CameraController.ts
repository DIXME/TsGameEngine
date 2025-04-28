import { Camera } from "./Camera.js";
import { KeyboardManager, KeyBind } from "./Keyboard.js";
import { pos3 } from "./Functions.js";

// this will just be a controller for the camera
// it will take a keyboard manager and a camera
// it will not be in the game loop
// it will function off of events

export class CameraController {
    private camera: Camera;
    private keyboard: KeyboardManager;
    private speed: number = 0.1; // speed of the camera

    constructor(camera: Camera, keyboard: KeyboardManager) {
        this.camera = camera;
        this.keyboard = keyboard;

        // Bind the keyboard events
        this.keyboard.bind("w", { whileDown: () => this.camera.push(pos3(0, 0, -this.speed)) } as KeyBind);
        this.keyboard.bind("s", { whileDown: () => this.camera.push(pos3(0, 0, this.speed)) } as KeyBind);
        this.keyboard.bind("a", { whileDown: () => this.camera.push(pos3(-this.speed, 0, 0))} as KeyBind);
        this.keyboard.bind("d", { whileDown: () => this.camera.push(pos3(this.speed, 0, 0)) } as KeyBind);
    
        this.keyboard.bind("q", { whileDown: () => this.camera.push(pos3(0, -this.speed, 0)) } as KeyBind);
        this.keyboard.bind("e", { whileDown: () => this.camera.push(pos3(0, this.speed, 0)) } as KeyBind);

        this.keyboard.bind("u", { whileDown: () => this.camera.pushRot(pos3(this.speed, 0, 0)) } as KeyBind);
        this.keyboard.bind("k", { whileDown: () => this.camera.pushRot(pos3(-this.speed, 0, 0)) } as KeyBind);
        this.keyboard.bind("j", { whileDown: () => this.camera.pushRot(pos3(0, this.speed, 0)) } as KeyBind);
        this.keyboard.bind("l", { whileDown: () => this.camera.pushRot(pos3(0, -this.speed, 0)) } as KeyBind);
    }
}