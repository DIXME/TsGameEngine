import { Vec3 } from "./Vectors.js";
export class Camera {
    // simple camera class to handle 2d and 3d cameras
    // this will be used to handle the camera position and rotation
    // as well as the projection of 3d points to 2d points

    public pos: Vec3;
    public rot: Vec3;
    public fov: number;

    public constructor(pos: Vec3, rot: Vec3, fov: number) {
        this.pos = pos;
        this.rot = rot;
        this.fov = fov;
    }
}