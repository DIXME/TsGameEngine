import { GameObject } from "./GameObject.js";
import { pos3 } from "./Functions.js";
export class Camera extends GameObject {
    constructor(pos, rot, fov, aspect, near = 0.1, far = 1000) {
        super();
        this.pos = pos;
        this.rot = rot;
        this.vel = pos3(0); // Initialize velocity to zero
        this.rotVel = pos3(0); // Initialize rotation velocity to zero
        this.fov = fov;
        this.aspect = aspect;
        this.near = near;
        this.far = far;
    }
    push(vel) {
        // Add velocity to the camera's current velocity
        this.vel = this.vel.add(vel);
    }
    setPos(pos) {
        // Set the camera's position
        this.pos = pos;
    }
    pushRot(rot) {
        // Add rotation to the camera's current rotation velocity
        this.rotVel = this.rotVel.add(rot);
    }
    setRot(rot) {
        // Set the camera's rotation
        this.rot = rot;
    }
    getPos() {
        // Get the camera's position
        return this.pos;
    }
    getRot() {
        // Get the camera's rotation
        return this.rot;
    }
    tick() {
        // Update camera position and rotation based on velocity and rotation velocity
        this.pos = this.pos.add(this.vel);
        this.rot = this.rot.add(this.rotVel);
        this.vel = this.vel.mul(pos3(0.99)); // Apply friction to velocity
        this.rotVel = this.rotVel.mul(pos3(0.99)); // Apply friction to rotation velocity
    }
}
