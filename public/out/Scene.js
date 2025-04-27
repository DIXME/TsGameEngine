import { GameObject2d, GameObject3d } from "./GameObject.js";
export class Scene {
    constructor(objects2d, objects3d, camera, graphics) {
        // this class will manage other objects every frame by calling a tick method
        // this class will hold 3d objects and 2d objects
        // it will hold gameobjects!
        // game objects will include anything that will tick
        // every frame, the keyboard manager is not a game object
        // it functions off of events, not a tick method
        this.objects2d = [];
        this.objects3d = [];
        this.objects2d = objects2d;
        this.objects3d = objects3d;
        this.camera = camera;
        this.graphics = graphics;
        // Bind the loop method to the correct context
        this.loop = this.loop.bind(this);
    }
    addObject(object) {
        // add an object to the scene
        if (object instanceof GameObject2d) {
            this.objects2d.push(object);
        }
        else if (object instanceof GameObject3d) {
            this.objects3d.push(object);
        }
        else {
            throw new Error("Object is not a GameObject2d or GameObject3d");
        }
    }
    removeObject(object) {
        // remove an object from the scene
        if (object instanceof GameObject2d) {
            this.objects2d = this.objects2d.filter(obj => obj !== object);
        }
        else if (object instanceof GameObject3d) {
            this.objects3d = this.objects3d.filter(obj => obj !== object);
        }
        else {
            throw new Error("Object is not a GameObject2d or GameObject3d");
        }
    }
    loop() {
        // call the tick method on all objects
        this.graphics.drawBackground();
        this.objects2d.forEach(object => object.tick(this.graphics));
        this.objects3d.forEach(object => object.tick(this.graphics, this.camera));
        this.camera.tick();
        requestAnimationFrame(this.loop);
    }
}
