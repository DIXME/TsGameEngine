import { Vec2, Vec3 } from "./Vectors.js";

export type canvasConfig = {
    B_plane: boolean,
    bg_color?: string,
    bg_img?: HTMLImageElement

    /**
     * @arg B_plane draw x & y axis over top of background
     * @arg bg_color (is a string beacuse canvas cant make the background an rgb color for some reason)background color (if(B_bgcolor){draw})
     * @arg bg_img background img (if(B_bgimage){draw})
     */
}

export type verts2d = Array<Vec2> | Vec2[];
export type verts3d = Array<Vec3> | Vec3[];
export type faces3d = Array<verts3d> | verts3d[];