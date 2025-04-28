import { Vec2, Vec3 } from './Vectors.js';
export class MathLib {
    static degreesToRadians(degrees) {
        return degrees * (Math.PI / 180);
    }
    static rotatePoint2(point, angle) {
        // we will use the rotation matrix to rotate the point around the origin
        angle = this.degreesToRadians(angle);
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        const martix = [
            [c, -s],
            [s, c]
        ];
        const x = point.x * martix[0][0] + point.y * martix[0][1];
        const y = point.x * martix[1][0] + point.y * martix[1][1];
        return new Vec2(x, y);
    }
    static projectPoint3(point, camera) {
        // Transform point to camera space
        let viewSpace = this.transformToViewSpace(point, camera);
        // Early Z clipping check
        if (viewSpace.z > -camera.near || viewSpace.z < -camera.far) {
            return new Vec2(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
        }
        // Perspective projection
        const fovRad = MathLib.degreesToRadians(camera.fov);
        const scale = 1.0 / Math.tan(fovRad / 2);
        // Project to normalized device coordinates (NDC)
        // Note: No need to add screenCenter since we want (0,0) at center
        const x = (viewSpace.x * scale) / -viewSpace.z;
        const y = (viewSpace.y * scale) / -viewSpace.z;
        // Scale to screen space while maintaining center origin
        const screenScale = Math.min(window.innerWidth, window.innerHeight) / 2;
        return new Vec2(x * screenScale * camera.aspect, y * screenScale);
    }
    static transformToViewSpace(point, camera) {
        let transformed = point.sub(camera.getPos());
        transformed = MathLib.rotate3dY(transformed, -camera.getRot().y);
        transformed = MathLib.rotate3dX(transformed, -camera.getRot().x);
        transformed = MathLib.rotate3dZ(transformed, -camera.getRot().z);
        return transformed;
    }
    static rotate3d(point, rotation) {
        // Apply rotations in order: Y, X, Z (yaw, pitch, roll)
        let rotated = point;
        rotated = this.rotate3dY(rotated, rotation.y);
        rotated = this.rotate3dX(rotated, rotation.x);
        rotated = this.rotate3dZ(rotated, rotation.z);
        return rotated;
    }
    static rotate3dX(point, angle) {
        const rad = this.degreesToRadians(angle);
        const cos = Math.cos(rad);
        const sin = Math.sin(rad);
        return new Vec3(point.x, point.y * cos - point.z * sin, point.y * sin + point.z * cos);
    }
    static rotate3dY(point, angle) {
        const rad = this.degreesToRadians(angle);
        const cos = Math.cos(rad);
        const sin = Math.sin(rad);
        return new Vec3(point.x * cos - point.z * sin, // Changed matrix multiplication order
        point.y, point.x * sin + point.z * cos // Changed matrix multiplication order
        );
    }
    static rotate3dZ(point, angle) {
        const rad = this.degreesToRadians(angle);
        const cos = Math.cos(rad);
        const sin = Math.sin(rad);
        return new Vec3(point.x * cos - point.y * sin, point.x * sin + point.y * cos, point.z);
    }
}
