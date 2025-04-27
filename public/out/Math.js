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
        // First translate point to camera space
        let viewSpace = point.sub(camera.getPos());
        // Early return if point is behind camera
        if (viewSpace.z <= 0) {
            return new Vec2(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
        }
        // Apply perspective projection
        const fovRad = MathLib.degreesToRadians(camera.fov);
        const scale = 1.0 / Math.tan(fovRad / 2);
        // Project the point
        const projectedX = (viewSpace.x * scale) / viewSpace.z;
        const projectedY = (viewSpace.y * scale) / viewSpace.z;
        // Convert to screen space
        const screenX = projectedX * (camera.aspect * 300); // Increased scale factor
        const screenY = projectedY * 300; // Increased scale factor
        return new Vec2(screenX, screenY);
    }
    static rotate3dX(point, angle) {
        angle = this.degreesToRadians(angle);
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        return new Vec3(point.x, point.y * c - point.z * s, point.y * s + point.z * c);
    }
    static rotate3dY(point, angle) {
        angle = this.degreesToRadians(angle);
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        return new Vec3(point.x * c + point.z * s, point.y, -point.x * s + point.z * c);
    }
    static rotate3dZ(point, angle) {
        angle = this.degreesToRadians(angle);
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        return new Vec3(point.x * c - point.y * s, point.x * s + point.y * c, point.z);
    }
    static rotate3d(point, rotation) {
        // Apply rotations in order: Y (yaw), X (pitch), Z (roll)
        let rotated = point;
        rotated = this.rotate3dY(rotated, rotation.y);
        rotated = this.rotate3dX(rotated, rotation.x);
        rotated = this.rotate3dZ(rotated, rotation.z);
        return rotated;
    }
}
