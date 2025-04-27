import { Vec2 } from './Vectors.js';

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
}