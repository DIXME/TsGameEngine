import { Vec3 } from "./Vectors";
import { point3 } from "./Types";

export interface GameObject {
    // placehodler so types are easier
    // game objects will be subclassed from this
}

export interface GameObject2d extends GameObject {
    // will put gameobejct 2d here latter but right now I care
    // about 3d
}

export interface GameObject3d extends GameObject {
    pos: point3;
    rot: point3;
    vel: point3;
    rotVel: point3;
}