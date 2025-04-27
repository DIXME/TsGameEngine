import { Vec2, Vec3 } from "./Vectors.js";
import { Color } from "./Colors.js";
export function pos2(x, y) {
    return new Vec2(x, y);
}
export function pos3(x, y, z) {
    return new Vec3(x, y, z);
}
export function color(r, g, b, a) {
    return new Color(r, g, b, a);
}
