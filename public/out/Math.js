import { Vec2, Vec3 } from "./Vectors.js";
export class MathLib {
    static degreesToRadians(degrees) {
        return degrees * (Math.PI / 180);
    }
    static matrixMultiply(matrixA, matrixB) {
        const rowsA = matrixA.length;
        const colsA = matrixA[0].length;
        const rowsB = matrixB.length;
        const colsB = matrixB[0].length;
        if (colsA !== rowsB) {
            throw new Error("Matrices cannot be multiplied: Incompatible dimensions.");
        }
        const result = new Array(rowsA).fill(null).map(() => new Array(colsB).fill(0));
        for (let i = 0; i < rowsA; i++) {
            for (let j = 0; j < colsB; j++) {
                for (let k = 0; k < colsA; k++) {
                    result[i][j] += matrixA[i][k] * matrixB[k][j];
                }
            }
        }
        return result;
    }
    static rotatePoint2(point, angle) {
        const rad = this.degreesToRadians(angle);
        const cos = Math.cos(rad);
        const sin = Math.sin(rad);
        const x = point.x * cos - point.y * sin;
        const y = point.x * sin + point.y * cos;
        return new Vec2(x, y);
    }
    static translationMartix(point) {
        return [
            [1, 0, 0, point.x],
            [0, 1, 0, point.y],
            [0, 0, 1, point.z],
            [0, 0, 0, 1]
        ];
        // points vector is a vector of tx ty tz
    }
    static translatePointToCenter(point) {
        var pointMatrix = [
            [point.x],
            [point.y],
            [point.z],
            [1]
        ];
        var distanceVector = new Vec3(point.x, point.y, point.z);
        var translationMartix = this.translationMartix(distanceVector);
        var newMartix = this.matrixMultiply(translationMartix, pointMatrix);
        return new Vec3(newMartix[0][0], newMartix[1][0], newMartix[2][0]);
    }
    static translatePoint(point, translation) {
        // we are going to be rotaing are projecting, thus we need to translate the point to the center of the screen with the translation matrix
        var pointMatrix = [
            [point.x],
            [point.y],
            [point.z],
            [1]
        ];
        var translationMartix = this.translationMartix(translation);
        var newMartix = this.matrixMultiply(translationMartix, pointMatrix);
        return new Vec3(newMartix[0][0], newMartix[1][0], newMartix[2][0]);
    }
    static projectPoint3(point, camera) {
        const viewSpace = this.transformToViewSpace(point, camera);
        // Z Clipping
        if (viewSpace.z > -camera.near || viewSpace.z < -camera.far) {
            return new Vec2(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
        }
        const fovRad = this.degreesToRadians(camera.fov);
        const scale = 1.0 / Math.tan(fovRad / 2);
        const x = (viewSpace.x * scale) / -viewSpace.z;
        const y = (viewSpace.y * scale) / -viewSpace.z;
        const screenScale = Math.min(window.innerWidth, window.innerHeight) / 2;
        return new Vec2(x * screenScale * camera.aspect, y * screenScale);
    }
    static transformToViewSpace(point, camera) {
        const relative = point.sub(camera.getPos());
        const rotation = camera.getRot(); // fixed from `cam.getRot()`
        return this.rotate3d(relative, new Vec3(-rotation.x, -rotation.y, -rotation.z));
    }
    static rotate3d(point, rotation) {
        return this.rotate3dZ(this.rotate3dX(this.rotate3dY(point, rotation.y), rotation.x), rotation.z);
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
        return new Vec3(point.x * cos + point.z * sin, point.y, -point.x * sin + point.z * cos);
    }
    static rotate3dZ(point, angle) {
        const rad = this.degreesToRadians(angle);
        const cos = Math.cos(rad);
        const sin = Math.sin(rad);
        return new Vec3(point.x * cos - point.y * sin, point.x * sin + point.y * cos, point.z);
    }
}
