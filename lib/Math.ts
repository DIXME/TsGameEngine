import { Vec2, Vec3 } from "./Vectors.js";
import { martix } from "./Types.js";
import { Camera } from "./Camera.js";

export class MathLib {
    public static degreesToRadians(degrees: number): number {
      return degrees * (Math.PI / 180);
    }
  
    public static matrixMultiply(matrixA: martix, matrixB: martix): martix {
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
  
    public static rotatePoint2(point: Vec2, angle: number): Vec2 {
      const rad = this.degreesToRadians(angle);
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);
  
      const x = point.x * cos - point.y * sin;
      const y = point.x * sin + point.y * cos;
  
      return new Vec2(x, y);
    }

    public static translationMartix(point: Vec3): martix {
      return [
        [1, 0, 0, point.x],
        [0, 1, 0, point.y],
        [0, 0, 1, point.z],
        [0, 0, 0, 1]
      ];
      // points vector is a vector of tx ty tz
    }
  
    public static translatePointToCenter(point: Vec3){
      var pointMatrix: martix = [
        [point.x],
        [point.y],
        [point.z],
        [1]
      ]
      var distanceVector: Vec3 = new Vec3(-point.x,-point.y,-point.z)
      var translationMartix: martix = this.translationMartix(distanceVector)
      var newMartix: martix = this.matrixMultiply(translationMartix,pointMatrix)
      return new Vec3(newMartix[0][0],newMartix[1][0],newMartix[2][0])
    }

    public static translatePoint(point: Vec3, translation: Vec3): Vec3 {
        // we are going to be rotaing are projecting, thus we need to translate the point to the center of the screen with the translation matrix
        var pointMatrix: martix = [
          [point.x],
          [point.y],
          [point.z],
          [1]
        ]
        var translationMartix: martix = this.translationMartix(translation)
        var newMartix: martix = this.matrixMultiply(translationMartix,pointMatrix)
        return new Vec3(newMartix[0][0],newMartix[1][0],newMartix[2][0])
    }
  
    public static projectPoint3(point: Vec3, camera: Camera): Vec2 {
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
  
      return new Vec2(
        x * screenScale * camera.aspect,
        y * screenScale
      );
    }
  
    private static transformToViewSpace(point: Vec3, camera: Camera): Vec3 {
      const relative = point.sub(camera.getPos());
      const rotation = camera.getRot(); // fixed from `cam.getRot()`
      return this.rotate3d(relative, new Vec3(-rotation.x, -rotation.y, -rotation.z));
    }
  
    public static rotate3d(point: Vec3, rotation: Vec3): Vec3 {
      return this.rotate3dZ(
        this.rotate3dX(
          this.rotate3dY(point, rotation.y),
          rotation.x
        ),
        rotation.z
      );
    }
  
    public static rotate3dX(point: Vec3, angle: number): Vec3 {
      const rad = this.degreesToRadians(angle);
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);
  
      return new Vec3(
        point.x,
        point.y * cos - point.z * sin,
        point.y * sin + point.z * cos
      );
    }
  
    public static rotate3dY(point: Vec3, angle: number): Vec3 {
      const rad = this.degreesToRadians(angle);
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);
  
      return new Vec3(
        point.x * cos + point.z * sin,
        point.y,
        -point.x * sin + point.z * cos
      );
    }
  
    public static rotate3dZ(point: Vec3, angle: number): Vec3 {
      const rad = this.degreesToRadians(angle);
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);
  
      return new Vec3(
        point.x * cos - point.y * sin,
        point.x * sin + point.y * cos,
        point.z
      );
    }
}