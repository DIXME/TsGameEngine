import { Vec3 } from "./Vectors.js";
// this will just be a controller for the camera
// it will take a keyboard manager and a camera
// it will not be in the game loop
// it will function off of events
export class CameraController {
    constructor(camera, keyboard) {
        this.speed = 0.1; // speed of the camera
        this.camera = camera;
        this.keyboard = keyboard;
        // Bind the keyboard events
        this.keyboard.bind("w", { whileDown: () => this.camera.push(new Vec3(0, 0, -this.speed)) });
        this.keyboard.bind("s", { whileDown: () => this.camera.push(new Vec3(0, 0, this.speed)) });
        this.keyboard.bind("a", { whileDown: () => this.camera.push(new Vec3(-this.speed, 0, 0)) });
        this.keyboard.bind("d", { whileDown: () => this.camera.push(new Vec3(this.speed, 0, 0)) });
        this.keyboard.bind("q", { whileDown: () => this.camera.push(new Vec3(0, -this.speed, 0)) });
        this.keyboard.bind("e", { whileDown: () => this.camera.push(new Vec3(0, this.speed, 0)) });
        this.keyboard.bind("u", { whileDown: () => this.camera.pushRot(new Vec3(this.speed, 0, 0)) });
        this.keyboard.bind("k", { whileDown: () => this.camera.pushRot(new Vec3(-this.speed, 0, 0)) });
        this.keyboard.bind("j", { whileDown: () => this.camera.pushRot(new Vec3(0, this.speed, 0)) });
        this.keyboard.bind("l", { whileDown: () => this.camera.pushRot(new Vec3(0, -this.speed, 0)) });
    }
}
