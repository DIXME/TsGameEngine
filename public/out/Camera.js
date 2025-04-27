export class Camera {
    constructor(pos, rot, fov, aspect, near = 0.1, far = 1000) {
        this.pos = pos;
        this.rot = rot;
        this.fov = fov;
        this.aspect = aspect;
        this.near = near;
        this.far = far;
    }
}
