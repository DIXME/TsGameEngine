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
    static projectPoint3(point, cm, cam) {
        // we will use the perspective projection matrix to project the point onto the screen
        const fov = cam.fov;
        const aspect = cm.canvas.width / cm.canvas.height;
        const near = 0.1;
        const far = 1000;
        const f = 1 / Math.tan(this.degreesToRadians(fov) / 2);
        const rangeInv = 1 / (near - far);
        const projectionMatrix = [
            [f / aspect, 0, 0, 0],
            [0, f, 0, 0],
            [0, 0, (near + far) * rangeInv, -1],
            [0, 0, (2 * near * far) * rangeInv, 0]
        ];
        const x = point.x * projectionMatrix[0][0] + point.y * projectionMatrix[1][0] + point.z * projectionMatrix[2][0] + projectionMatrix[3][0];
        const y = point.x * projectionMatrix[0][1] + point.y * projectionMatrix[1][1] + point.z * projectionMatrix[2][1] + projectionMatrix[3][1];
        return new Vec2(x, y);
    }
    static rotate3dX(point, angle) {
        // we will use the rotation matrix to rotate the point around the x axis
        angle = this.degreesToRadians(angle);
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        const martix = [
            [1, 0, 0],
            [0, c, -s],
            [0, s, c]
        ];
        const x = point.x * martix[0][0] + point.y * martix[0][1] + point.z * martix[0][2];
        const y = point.x * martix[1][0] + point.y * martix[1][1] + point.z * martix[1][2];
        const z = point.x * martix[2][0] + point.y * martix[2][1] + point.z * martix[2][2];
        return new Vec3(x, y, z);
    }
    static rotate3dY(point, angle) {
        // we will use the rotation matrix to rotate the point around the y axis
        angle = this.degreesToRadians(angle);
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        const martix = [
            [c, 0, s],
            [0, 1, 0],
            [-s, 0, c]
        ];
        const x = point.x * martix[0][0] + point.y * martix[0][1] + point.z * martix[0][2];
        const y = point.x * martix[1][0] + point.y * martix[1][1] + point.z * martix[1][2];
        const z = point.x * martix[2][0] + point.y * martix[2][1] + point.z * martix[2][2];
        return new Vec3(x, y, z);
    }
    static rotate3dZ(point, angle) {
        // we will use the rotation matrix to rotate the point around the z axis
        angle = this.degreesToRadians(angle);
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        const martix = [
            [c, -s, 0],
            [s, c, 0],
            [0, 0, 1]
        ];
        const x = point.x * martix[0][0] + point.y * martix[0][1] + point.z * martix[0][2];
        const y = point.x * martix[1][0] + point.y * martix[1][1] + point.z * martix[1][2];
        const z = point.x * martix[2][0] + point.y * martix[2][1] + point.z * martix[2][2];
        return new Vec3(x, y, z);
    }
    static rotate3d(point, angl) {
        // we will use the rotation matrix to rotate the point around the x, y and z axis
        if (angl.x != 0)
            point = MathLib.rotate3dX(point, angl.x);
        if (angl.y != 0)
            point = MathLib.rotate3dY(point, angl.y);
        if (angl.z != 0)
            point = MathLib.rotate3dZ(point, angl.z);
        return point;
    }
}
