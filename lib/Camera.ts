import { Vec3 } from "./Vectors.js";
export class Camera {
    pos: Vec3;
    rot: Vec3; // Rotation in degrees (pitch, yaw, roll)
    fov: number; // Field of view in degrees
    aspect: number; // Aspect ratio (canvas width / height)
    near: number; // Near clipping plane
    far: number; // Far clipping plane

    constructor(pos: Vec3, rot: Vec3, fov: number, aspect: number, near: number = 0.1, far: number = 1000) {
        this.pos = pos;
        this.rot = rot;
        this.fov = fov;
        this.aspect = aspect;
        this.near = near;
        this.far = far;
    }
}