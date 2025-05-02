import { Vec3 } from "./Vectors";
import { matrix, point3 } from "./Types";

export class Math3d {
    static dot(v1: Vec3, v2: Vec3): number {
        return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
    }

    static multiplyMatrices(a: matrix, b: matrix): matrix {
        const aRows = a.length, aCols = a[0].length;
        const bRows = b.length, bCols = b[0].length;

        if (aCols !== bRows) {
            throw new Error("Incompatible matrix dimensions.");
        }

        const result: matrix = Array.from({ length: aRows }, () => Array(bCols).fill(0));

        for (let i = 0; i < aRows; i++) {
            for (let k = 0; k < aCols; k++) {
                const aik = a[i][k];
                for (let j = 0; j < bCols; j++) {
                    result[i][j] += aik * b[k][j];
                }
            }
        }

        return result;
    }

    static translationMatrix3(pos: point3, t: point3): matrix{
        return [
            [1, 0, 0, t.x],
            [0, 1, 0, t.y],
            [0, 0, 1, t.z],
            [0, 0, 0,   1]
        ]
    }

    static rotationMatrices3(pos: point3, rot: point3): Record<string, matrix> {
        let cx: number = Math.cos(rot.x)
        let sx: number = Math.sin(rot.x)

        let cy: number = Math.cos(rot.y)
        let sy: number = Math.sin(rot.y)

        let cz: number = Math.cos(rot.z)
        let sz: number = Math.sin(rot.y)

        return {
            x: [
                [1, 0,  0],
                [0,cx,-sx],
                [0,sx, cx]
            ],
            y: [
                [cy, 0,  sy],
                [0,   1,  0],
                [-sy, 0, cy]
            ],
            z: [
                [cz,-sz,0],
                [sz, cz,0],
                [0,  0, 1]
            ]
        }
    }

    static projectionMatrix(pos: point3, cam: Camera): matrix {
        let tf: number = Math.tan(cam.fov/2);
        let nfs: number = cam.near + cam.far;
        let nfd: number = cam.near - cam.far;
        let nfp: number = cam.near * cam.far;
        return [
            [1/(tf*cam.aspect_ratio), 0, 0, 0],
            [0, 1/tf, 0, 0],
            [0, 0, nfs/nfd, 2*nfp/nfd],
            [0, 0, -1, 0]
        ]
    }

    static  rotateVector3(point: Vec3, r: Vec3, cam: Camera): Vec3 {
        let unpackedPointMatrix: matrix;
        unpackedPointMatrix = this.multiplyMatrices( rotationMatrices.z, point.mt3() );
        point = Vec3.fromMt(unpackedPointMatrix);
        unpackedPointMatrix = this.multiplyMatrices( rotationMatrices.y, point.mt3() );
        point = Vec3.fromMt(unpackedPointMatrix);
        unpackedPointMatrix = this.multiplyMatrices( rotationMatrices.x, point.mt3() );
        return Vec3.fromMt(unpackedPointMatrix);
    }

    static rotatePoint3(point: point3, r: point3, cam: Camera): point3 {
        let original: point3 = point;
        point = Vec3.fromMt( this.multiplyMatrices( this.translationMatrix3( point,point.opp() ), point.mt4() ) );
        point = this.rotateVector3(point, r, cam);
        point = Vec3.fromMt( this.multiplyMatrices( this.translationMatrix3( point, original ), point.mt4() ) );
        return point;
    }
}