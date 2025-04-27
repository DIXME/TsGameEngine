import { canvasConfig } from "./Types.js";
import { Vec2 } from "./Vectors.js";

export class CanvasManager {
    // anything canvas management wise gose here
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    settings: canvasConfig;

    public constructor(id: string,
    w: number = globalThis.innerWidth,
    h: number = globalThis.innerHeight,
    settings?: canvasConfig) {
        /**
        * @param id id of the canvas on the document
        * @param w will be set the width of the canvas (defualt=globalThis.innerWidth)
        * @param h will be set the height of the canvas (defualt=globalThis.innerWidth)
        * @param settings canvas settings (read canvas settings type)
        */
        // we get an error he beacuse the get element by id method dose not sepcify the
        // return type of html canvas elements for some reason
        var c = document.getElementById(id) as HTMLCanvasElement;
        if(!c){
            var canvas = document.createElement('canvas');
            canvas.id = id;
            document.body.appendChild(canvas);
            c = document.getElementById(id) as HTMLCanvasElement;
        }
        this.canvas = c;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        this.swh(w, h);

        // set defulat settings
        if(!settings){
            settings = {
                B_plane: true,
                bg_color: 'blue',
                bg_img: new Image()
            }
        }
        this.settings = settings;
    }

    swh(w: number, h: number): void {
        // set width and height
        this.canvas.width = w;
        this.canvas.height = h;
        }

        fix(): void {
        // applies no padding to the document so the canvas fits perfectly
        const style = document.createElement("style");
        style.innerText = `
        * {
        margin: 0px;
        position: fixed;
        }

        #ui {
        width: 100vw;
        height: 100vh;
        position: fixed;
        border: 1px solid black;
        border-radius: 10px

        }

        #ui * {
        position: initial;
        text-align: center;
        }
        `;
        // the ui is here beacuse the css above will overdide it
        document.body.appendChild(style);
    }

    public translate2(pos: Vec2): Vec2 {
        return new Vec2(pos.x + (this.canvas.width / 2), pos.y + (this.canvas.height / 2))
    }
}