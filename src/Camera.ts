class Camera {
    public fov: number;
    public near: number;
    public far: number;
    public aspect_ratio: number;

    constructor(fov: number = 60, near: number = 0.1, far: number = 1000, aspect_ratio: number = 4/3) {
        this.fov = fov;
        this.near = near;
        this.far = far;
        this.aspect_ratio = aspect_ratio;
    }
}