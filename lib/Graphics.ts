import { CanvasManager } from "./CanvasManager.js";
import { Color } from "./Colors.js";
import { Vec2, Vec3 } from "./Vectors.js";
import { pos2, pos3 } from "./Functions.js";
import { MathLib } from "./Math.js";
import { verts2d, verts3d, faces3d } from "./Types.js";
import { Camera } from "./Camera.js";

/**
 * i want to fix my functions so theres just one 
 * function for each
 * shape that has alot of settings that are optinal
 */

export class Graphics {
    bgColor: Color;
    cm: CanvasManager;

    // methods that do not specify 3d in there name will be 2d and not be corroloated witht a 3d scene

    /**
     * 🚀 notes 🚀
     * - the reason some drawing methods have a canvas at the end is beacuse
     *   they are being drawn with built in canvas functions instead of
     *   just drawinng the points witch we will make eveuntly
     *   reason is that if we want to rotate somthing we need to apply
     *   the martix to every point and the canvas functions will not allow this
     *   so we will just make seprate functions that use our connectPoints method instead
     *
     * - this is basicly just an api that allows you to interact
     *   with the canvas and my canvas manager export class
     */

    rectprismVerts(pos: Vec3, whdv: Vec3): faces3d {
        /**
         * @param pos centered & translated cords (this is a position)
         * @param whdv width, height & depth vector
         */
        var topLeftBack = pos3(pos.x - (whdv.x / 2), pos.y - (whdv.y / 2), pos.z - (whdv.z / 2))
        var topRightBack = pos3(pos.x + (whdv.x / 2), pos.y - (whdv.y / 2), pos.z - (whdv.z / 2))
        var bottomLeftBack = pos3(pos.x - (whdv.x / 2), pos.y + (whdv.y / 2), pos.z - (whdv.z / 2))
        var bottomRightBack = pos3(pos.x + (whdv.x / 2), pos.y + (whdv.y / 2), pos.z - (whdv.z / 2))

        var topLeftFront = pos3(pos.x - (whdv.x / 2), pos.y - (whdv.y / 2), pos.z + (whdv.z / 2))
        var topRightFront = pos3(pos.x + (whdv.x / 2), pos.y - (whdv.y / 2), pos.z + (whdv.z / 2))
        var bottomLeftFront = pos3(pos.x - (whdv.x / 2), pos.y + (whdv.y / 2), pos.z + (whdv.z / 2))
        var bottomRightFront = pos3(pos.x + (whdv.x / 2), pos.y + (whdv.y / 2), pos.z + (whdv.z / 2))
        return [
            [
                topLeftFront,
                topRightFront,
                bottomLeftFront,
                bottomRightFront
            ],
            [
                topLeftBack,
                topRightBack,
                bottomLeftBack,
                bottomRightBack
            ],
            [
                topLeftBack,
                topLeftFront,
                bottomRightFront,
                bottomLeftBack
            ],
            [
                topRightBack,
                topRightFront,
                bottomRightBack,
                bottomRightFront
            ],
            [
                topLeftBack,
                topRightBack,
                topRightFront,
                topLeftFront
            ],
            [
                bottomLeftBack,
                bottomRightBack,
                bottomRightFront,
                bottomLeftFront,
            ]

        ]
    }

    rectVerts(pos: Vec2, whv: Vec2): verts2d {
        /**
         * @param pos centered & translated cords (this is a position)
         * @param whv width & height vector
         */
        var topLeft = pos2(pos.x - (whv.x / 2), pos.y - (whv.y / 2))
        var topRight = pos2(pos.x + (whv.x / 2), pos.y - (whv.y / 2))
        var bottomLeft = pos2(pos.x - (whv.x / 2), pos.y + (whv.y / 2))
        var bottomRight = pos2(pos.x + (whv.x / 2), pos.y + (whv.y / 2))

        return {
            topLeft: topLeft,
            topRight: topRight,
            bottomLeft: bottomLeft,
            bottomRight: bottomRight
        }
    }

    triangleIcosVerts(pos: Vec2, bhv: Vec2): verts2d {
        /**
         * @param pos centered & translated cords (this is a position)
         * @param bhv base & height vector
         */
        var left = pos2(pos.x - (bhv.x / 2), pos.y + (bhv.y / 2))
        var right = pos2(pos.x + (bhv.x / 2), pos.y + (bhv.y / 2))
        var top = pos2(pos.x, pos.y - (bhv.y / 2))

        return {
            left: left,
            right: right,
            top: top
        }
    }

    triangleVerts(pos: Vec2, bhv: Vec2): verts2d {
        /**
         * @param pos centered & translated cords (this is a position)
         * @param bhv base & height vector
         */
        var left = pos2(pos.x - (bhv.x / 2), pos.y + (bhv.y / 2))
        var right = pos2(pos.x + (bhv.x / 2), pos.y + (bhv.y / 2))
        var top = pos2(pos.x, pos.y - (bhv.y / 2))

        return {
            left: left,
            right: right,
            top: top
        }
    }

    drawBackground(){
        // order matters!
        if (this.cm.settings.bg_color) this.clearScreenColor(this.cm.settings.bg_color);
        if (this.cm.settings.bg_img) this // we will draw an image instead of a background color if it is turned on
        if (this.cm.settings.B_plane) this.drawPlane();
    }

    rotatePoints3d(points: verts3d, rot: Vec3): verts3d {
        /**
         * @param points points to rotate (verts3d)
         * @param rot rotation vector (vec3)
         */
        var rotatedPoints: verts3d = points.map((point) => {
            return point.map((p) => {
                return MathLib.rotatePoint3(p, rot);
            });
        });

        return rotatedPoints;
    }

    rotateFaces3d(faces: faces3d, rot: Vec3): faces3d {
        /**
         * @param faces faces to rotate (faces3d)
         * @param rot rotation vector (vec3)
         */
        var rotatedFaces: faces3d = faces.map((face) => {
            return face.map((point) => {
                return MathLib.rotatePoints3(point, rot);
            });
        });
        return rotatedFaces;
    }

    projectPoints3d(points: verts3d, cam: Camera): verts3d {
        /**
         * @param points points to project (verts3d)
         * @param cam camera to project with (camera)
         */
        var projectedPoints: verts3d = points.map((point) => {
            return point.map((p) => {
                return MathLib.projectPoint3(p, this.cm, cam);
            });
        });
        return projectedPoints;
    }

    projectFaces3d(faces: faces3d, cam: Camera): faces3d {
        /**
         * @param faces faces to project (faces3d)
         * @param cam camera to project with (camera)
         */
        var projectedFaces: faces3d = faces.map((face) => {
            return face.map((point) => {
                return MathLib.projectPoint3(point, this.cm, cam);
            });
        }) as faces3d;
        return projectedFaces;
    }

    faces2dToPoints2d(faces: faces3d): verts2d {
        /**
         * @param faces faces to convert to points (faces3d)
         */
        var points: verts2d = faces.map((face) => {
            return face.map((point) => {
                return pos2(point.x, point.y);
            });
        }) as unknown as verts2d;
        return points;
    }

    // this export class will handle all of graphics

    constructor(bgColor: Color, cm: CanvasManager) {
        /**
         * @param bgColor background color (string)
         * @param cm CanvasManager (CanvasManager instance)
         */
        this.bgColor = bgColor;
        this.cm = cm;
    }

    clearScreenColor(colorC: string): void {
        this.cm.ctx.fillStyle = colorC.toString();
        this.cm.ctx.fillRect(0, 0, this.cm.canvas.width, this.cm.canvas.height);
    }

    // -------Rects------- (start)

    rect(pos: Vec2, whv: Vec2, color: Color, fill?: boolean, borderSize?: number, rot?: number): void {
        /**
         * @arg pos centered & translated cords (this is a position)
         * @arg whv width & height vector
         * @arg color color string (stroke style)
         */
        // this is going to be drawing a rect but with my connect points function so latter we can apply rotaion and other things
        // we would do some math here like roation
        var verts: verts2d = this.rectVerts(pos, whv);
        var topLeft = verts.topLeft;
        var topRight = verts.topRight;
        var bottomLeft = verts.bottomLeft;
        var bottomRight = verts.bottomRight;
        if (rot && rot != 0) {
            // apply roation
            topLeft = MathLib.rotatePoint2(topLeft, rot);
            topRight = MathLib.rotatePoint2(topRight, rot);
            bottomLeft = MathLib.rotatePoint2(bottomLeft, rot);
            bottomRight = MathLib.rotatePoint2(bottomRight, rot);
        }
        if (!fill) this.connectPoints2([topLeft, topRight, bottomRight, bottomLeft], color, borderSize);
        if(fill) this.connectPoints2([topLeft, topRight, bottomRight, bottomLeft], color, 1, true);
    }

    rectCanvas(pos: Vec2, whv: Vec2, color: Color, fill?: boolean, borderSize?: number): void {
        /**
         * @arg pos centered & translated cords (this is a position)
         * @arg whv width & height vector
         * @arg color color string (stroke style)
         */
        if(!borderSize) borderSize = 1;
        pos = this.cm.translate2(pos);
        if(!fill) {
            this.cm.ctx.strokeStyle = color.toString();
            this.cm.ctx.lineWidth = borderSize;
            this.cm.ctx.strokeRect((pos.x - (whv.x / 2)),(pos.y - (whv.y / 2)),whv.x,whv.y);
        } else {
            this.cm.ctx.fillStyle = color.toString();
            this.cm.ctx.fillRect((pos.x - (whv.x / 2)),(pos.y - (whv.y / 2)),whv.x,whv.y);
        }
    }

    rectprism(pos: Vec3, whdv: Vec3, cam: Camera, color: Color, fill?: boolean, borderSize?: number, rot?: Vec3): void {
        /**
         * @arg pos centered & translated cords (this is a position)
         * @arg whdv width, height & depth vector
         * @arg color color string (stroke style)
         */
        if(!rot) rot = new Vec3(0, 0, 0);
        var faces: faces3d = this.rectprismVerts(pos, whdv);
        var rotatedPoints: faces3d = this.rotateFaces3d(faces, rot);
        var projectedPoints: faces3d = this.projectFaces3d(rotatedPoints, cam);
        this.connectPoints2(this.faces2dToPoints2d(projectedPoints), color, borderSize, fill);
    }

    // -------Rects------- (end)

    // #########################

    // -------Circles------- (start)

    circleCanvas(pos: Vec2, r: number, color: Color, fill?: boolean, borderSize?: number): void {
        /**
         * @param pos postion (vec2) (centred & translated)
         * @param r radius (number)
         * @param color color (Color instance)
         /*/
        pos = this.cm.translate2(pos) // topDown => cord plane

        this.cm.ctx.moveTo(pos.x - r / 2, pos.y + r / 2); // center
        this.cm.ctx.beginPath();

        this.cm.ctx.arc(pos.x, pos.y, r, 0, 360);
        if(fill){
            this.cm.ctx.fillStyle = color.toString();
            this.cm.ctx.fill();
        } else {
            if(!borderSize) borderSize = 2;
            this.cm.ctx.strokeStyle = color.toString();
            this.cm.ctx.lineWidth = borderSize;
            this.cm.ctx.stroke();
        }
        this.cm.ctx.closePath();
    }

    // -------Circles------- (end)

    // ⚠️ Impoarnt Preformce Issues Most Likely Caused By This
    // (every 3d model is just triangles and therer made with this function) ⚠️
    connectPoints2(points: Array<Vec2>, outline: Color, lineWide?: number, fill?: boolean): void {
        /**
         * @param origin
         * @param points
         * @param outline
         * @param lineWide
         */
        if (!lineWide) lineWide = 1
        this.cm.ctx.beginPath();
        this.cm.ctx.lineWidth = lineWide;
        if(!fill) this.cm.ctx.strokeStyle = outline.toString();
        if(fill) this.cm.ctx.fillStyle = outline.toString();
        points.forEach(p => {
        p = this.cm.translate2(p);
        this.cm.ctx.lineTo(p.x, p.y);
        })
        var first = this.cm.translate2(points[0]);
        this.cm.ctx.lineTo(first.x, first.y); // go back to the first point to connect all points
        // otherwise it would be open and not be a polygon
        if(!fill) this.cm.ctx.stroke()
        if(fill) this.cm.ctx.fill()
        this.cm.ctx.closePath();
    }

    // -------Triangles------- (start)

    tri(pos: Vec2, bhv: Vec2, outline: Color, borderSize?: number, fill?: boolean, rot?: number): void {
        /**
         * @param pos postion (vec2) (centred & translated)
         * @param bhv base & height (vec2)
         * @param color color (Color instance)
         * @param borderSize line width (defualt is 1)
         /*/
        // we dont translate here beacuse the draw points method dose this for us
        // if we dont the object will be at the bottom right corner

        if (!borderSize) borderSize = 1;

        // for clarity we have to do this twice
        // - we do this when drawing to center the object
        // - we do this again when calculating the points of the triangle
        // ⚠ its not a misake ⚠

        var left = pos2(pos.x - bhv.x / 2, pos.y + bhv.y / 2)
        var right = pos2(pos.x + bhv.x / 2, pos.y + bhv.y / 2)
        var top = pos2(pos.x, pos.y - bhv.y / 2)

        if (!rot) {
            rot = 0;
        } else {
            // apply roation
            left = MathLib.rotatePoint2(left, rot);
            right = MathLib.rotatePoint2(right, rot);
            top = MathLib.rotatePoint2(top, rot);
        }

        if(fill) this.connectPoints2([left, right, top], outline, borderSize, true);
        if(!fill) this.connectPoints2([left, right, top], outline, borderSize, false);
    }

    // -------Triangles------- (end)

    // other

    drawPlane(): void {
        this.cm.ctx.strokeStyle = 'rgba(0,25,0,255)';
        this.cm.ctx.lineWidth = 5
        this.cm.ctx.beginPath();

        // x
        this.cm.ctx.moveTo(this.cm.canvas.width / 2, 0);
        this.cm.ctx.lineTo(this.cm.canvas.width / 2, this.cm.canvas.height);

        // y
        this.cm.ctx.moveTo(0, this.cm.canvas.height / 2);
        this.cm.ctx.lineTo(this.cm.canvas.width, this.cm.canvas.height / 2);

        this.cm.ctx.stroke();
        this.cm.ctx.closePath();
    }
}