import { GameObject } from "./GameObject.js";
import { Vec3 } from "./Vectors.js";

export class Camera extends GameObject {
    fov: number; // Field of view in degrees
    aspect: number; // Aspect ratio (canvas width / height)
    near: number; // Near clipping plane
    far: number; // Far clipping plane
    private pos: Vec3; // Position in 3D space
    private rot: Vec3; // Rotation in 3D space (pitch, yaw, roll)
    private vel: Vec3; // Velocity in 3D space
    private rotVel: Vec3; // Rotation velocity in 3D spacess

    constructor(pos: Vec3, rot: Vec3, fov: number, aspect: number, near: number = 0.1, far: number = 1000) {
        super();
        this.pos = pos;
        this.rot = rot;
        this.vel = new Vec3(0); // Initialize velocity to zero
        this.rotVel = new Vec3(0); // Initialize rotation velocity to zero
        this.fov = fov;
        this.aspect = aspect;
        this.near = near;
        this.far = far;
    }

    push(vel: Vec3): void {
        // Add velocity to the camera's current velocity
        this.vel = this.vel.add(vel);
    }

    setPos(pos: Vec3): void {
        // Set the camera's position
        this.pos = pos;
    }

    pushRot(rot: Vec3): void {
        // Add rotation to the camera's current rotation velocity
        this.rotVel = this.rotVel.add(rot);
    }

    setRot(rot: Vec3): void {
        // Set the camera's rotation
        this.rot = rot;
    }

    getPos(): Vec3 {
        // Get the camera's position
        return this.pos;
    }

    getRot(): Vec3 {
        // Get the camera's rotation
        return this.rot;
    }

    tick(): void {
        // Update camera position and rotation based on velocity and rotation velocity
        this.pos = this.pos.add(this.vel);
        this.rot = this.rot.add(this.rotVel);
        this.vel = this.vel.mul(new Vec3(0.99)); // Apply friction to velocity
        this.rotVel = this.rotVel.mul(new Vec3(0.99)); // Apply friction to rotation velocity
    }
}