import { Vec2, Vec3 } from './Vectors.js';
import { Camera } from './Camera.js';
import { CanvasManager } from './CanvasManager.js';

export class MathLib {

    public static degreesToRadians(degrees: number): number {
        return degrees * (Math.PI / 180);
    }

    public static rotatePoint2(point: Vec2, angle: number): Vec2 {
        // we will use the rotation matrix to rotate the point around the origin
        angle = this.degreesToRadians(angle)
        
        const c = Math.cos(angle)
        const s = Math.sin(angle)

        const martix = [
            [c,-s],
            [s, c]
        ]

        const x = point.x * martix[0][0] + point.y * martix[0][1]
        const y = point.x * martix[1][0] + point.y * martix[1][1]
        
        return new Vec2(x, y)
    }
    
    public static projectPoint3(point: Vec3, camera: Camera): Vec2 {
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

    public static rotate3dX(point: Vec3, angle: number): Vec3 {
        angle = this.degreesToRadians(angle);
        const c = Math.cos(angle);
        const s = Math.sin(angle);

        return new Vec3(
            point.x,
            point.y * c - point.z * s,
            point.y * s + point.z * c
        );
    }

    public static rotate3dY(point: Vec3, angle: number): Vec3 {
        angle = this.degreesToRadians(angle);
        const c = Math.cos(angle);
        const s = Math.sin(angle);

        return new Vec3(
            point.x * c + point.z * s,
            point.y,
            -point.x * s + point.z * c
        );
    }

    public static rotate3dZ(point: Vec3, angle: number): Vec3 {
        angle = this.degreesToRadians(angle);
        const c = Math.cos(angle);
        const s = Math.sin(angle);

        return new Vec3(
            point.x * c - point.y * s,
            point.x * s + point.y * c,
            point.z
        );
    }

    public static rotate3d(point: Vec3, rotation: Vec3): Vec3 {
        // Apply rotations in order: Y (yaw), X (pitch), Z (roll)
        let rotated = point;
        rotated = this.rotate3dY(rotated, rotation.y);
        rotated = this.rotate3dX(rotated, rotation.x);
        rotated = this.rotate3dZ(rotated, rotation.z);
        return rotated;
    }
}