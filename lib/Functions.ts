import { Vec2, Vec3 } from "./Vectors.js";
import { Color } from "./Colors.js";

export function pos2(x: number, y?: number): Vec2 {
    return new Vec2(x, y);
}

export function pos3(x: number, y?: number, z?: number): Vec3 {
    return new Vec3(x, y, z);
}

export function color(r: number, g: number, b: number, a?: number): Color {
    return new Color(r, g, b, a);
}
