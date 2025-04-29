import { Vec2, Vec3 } from "./Vectors.js";

export type canvasConfig = {
    B_plane: boolean;
    bg_color?: string;
    bg_img?: HTMLImageElement;
};

export type verts2d = Array<Vec2> | Vec2[];
export type verts3d = Array<Vec3> | Vec3[];
export type faces3d = Array<verts3d> | verts3d[];
export type martix = number[][];