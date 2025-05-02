import { Vec2, Vec3 } from "./Vectors";
import { point2, point3 } from "./Types";

export class CanvasManager {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    width: number;
    height: number;

    constructor(width: number, height: number, id?:string) {
        this.width = width;
        this.height = height;

        if (id) {
            this.canvas = document.getElementById(id) as HTMLCanvasElement
        } else {
            this.canvas = document.createElement("canvas")
        }

        this.canvas.width = width;
        this.canvas.height = height;

        this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    }

    setSize(width: number, height: number): void {
        this.width = width;
        this.height = height;
        this.canvas.width = width;
        this.canvas.height = height;
    }

    translate2(point: point2): point2 {
        return new Vec2(this.width/2 + point.x, this.height/2 + point.y);
    }
}