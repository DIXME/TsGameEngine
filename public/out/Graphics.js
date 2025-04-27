import { Vec2 } from "./Vectors.js";
import { pos2, pos3 } from "./Functions.js";
import { MathLib } from "./Math.js";
/**
 * i want to fix my functions so theres just one
 * function for each
 * shape that has alot of settings that are optinal
 */
export class Graphics {
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
    rectprismVerts(pos, whdv) {
        /**
         * @param pos centered & translated cords (this is a position)
         * @param whdv width, height & depth vector
         */
        const topLeftBack = pos3(pos.x - (whdv.x / 2), pos.y - (whdv.y / 2), pos.z - (whdv.z / 2));
        const topRightBack = pos3(pos.x + (whdv.x / 2), pos.y - (whdv.y / 2), pos.z - (whdv.z / 2));
        const bottomLeftBack = pos3(pos.x - (whdv.x / 2), pos.y + (whdv.y / 2), pos.z - (whdv.z / 2));
        const bottomRightBack = pos3(pos.x + (whdv.x / 2), pos.y + (whdv.y / 2), pos.z - (whdv.z / 2));
        const topLeftFront = pos3(pos.x - (whdv.x / 2), pos.y - (whdv.y / 2), pos.z + (whdv.z / 2));
        const topRightFront = pos3(pos.x + (whdv.x / 2), pos.y - (whdv.y / 2), pos.z + (whdv.z / 2));
        const bottomLeftFront = pos3(pos.x - (whdv.x / 2), pos.y + (whdv.y / 2), pos.z + (whdv.z / 2));
        const bottomRightFront = pos3(pos.x + (whdv.x / 2), pos.y + (whdv.y / 2), pos.z + (whdv.z / 2));
        return [
            // Front face (clockwise order)
            [topLeftFront, topRightFront, bottomRightFront, bottomLeftFront],
            // Back face (clockwise order)
            [topLeftBack, bottomLeftBack, bottomRightBack, topRightBack],
            // Left face (clockwise order)
            [topLeftBack, topLeftFront, bottomLeftFront, bottomLeftBack],
            // Right face (clockwise order)
            [topRightBack, bottomRightBack, bottomRightFront, topRightFront],
            // Top face (clockwise order)
            [topLeftBack, topRightBack, topRightFront, topLeftFront],
            // Bottom face (clockwise order)
            [bottomLeftBack, bottomLeftFront, bottomRightFront, bottomRightBack],
        ];
    }
    rectVerts(pos, whv) {
        /**
         * @param pos centered & translated cords (this is a position)
         * @param whv width & height vector
         */
        var topLeft = pos2(pos.x - (whv.x / 2), pos.y - (whv.y / 2));
        var topRight = pos2(pos.x + (whv.x / 2), pos.y - (whv.y / 2));
        var bottomLeft = pos2(pos.x - (whv.x / 2), pos.y + (whv.y / 2));
        var bottomRight = pos2(pos.x + (whv.x / 2), pos.y + (whv.y / 2));
        return [
            bottomLeft,
            topLeft,
            topRight,
            bottomRight
        ];
    }
    triangleIcosVerts(pos, bhv) {
        /**
         * @param pos centered & translated cords (this is a position)
         * @param bhv base & height vector
         */
        var left = pos2(pos.x - (bhv.x / 2), pos.y + (bhv.y / 2));
        var right = pos2(pos.x + (bhv.x / 2), pos.y + (bhv.y / 2));
        var top = pos2(pos.x, pos.y - (bhv.y / 2));
        return [
            left,
            right,
            top
        ];
    }
    triangleVerts(pos, bhv) {
        /**
         * @param pos centered & translated cords (this is a position)
         * @param bhv base & height vector
         */
        var left = pos2(pos.x - (bhv.x / 2), pos.y + (bhv.y / 2));
        var right = pos2(pos.x + (bhv.x / 2), pos.y + (bhv.y / 2));
        var top = pos2(pos.x, pos.y - (bhv.y / 2));
        return [
            left,
            right,
            top
        ];
    }
    drawBackground() {
        // order matters!
        if (this.cm.settings.bg_color)
            this.clearScreenColor(this.cm.settings.bg_color);
        if (this.cm.settings.bg_img)
            this; // we will draw an image instead of a background color if it is turned on
        if (this.cm.settings.B_plane)
            this.drawPlane();
    }
    verts2dToverts3d(verts, z) {
        /**
         * @param verts array of points (verts2d)
         * @param z z position (number)
         */
        return verts.map(v => pos3(v.x, v.y, z));
    }
    rotateFaces(faces, rotation) {
        return faces.map(face => face.map(point => MathLib.rotate3d(point, rotation)));
    }
    drawFaces(faces, cam, color, fill, borderSize) {
        /**
         * @param faces array of faces (array of points)
         * @param cam camera object (Camera instance)
         * @param color color string (stroke style)
         * @param fill fill the shape or not (default is false)
         * @param borderSize line width (default is 1)
         */
        if (!borderSize)
            borderSize = 1;
        faces.forEach(face => {
            const projectedFace = face.map(p => MathLib.projectPoint3(p, cam));
            if (!fill)
                this.connectPoints2(projectedFace, color, borderSize);
            if (fill)
                this.connectPoints2(projectedFace, color, 1, true);
        });
    }
    // this export class will handle all of graphics
    constructor(bgColor, cm) {
        /**
         * @param bgColor background color (string)
         * @param cm CanvasManager (CanvasManager instance)
         */
        this.bgColor = bgColor;
        this.cm = cm;
    }
    clearScreenColor(colorC) {
        this.cm.ctx.fillStyle = colorC.toString();
        this.cm.ctx.fillRect(0, 0, this.cm.canvas.width, this.cm.canvas.height);
    }
    // -------Rects------- (start)
    rect(pos, whv, color, fill, borderSize, rot) {
        /**
         * @arg pos centered & translated cords (this is a position)
         * @arg whv width & height vector
         * @arg color color string (stroke style)
         */
        // this is going to be drawing a rect but with my connect points function so latter we can apply rotaion and other things
        // we would do some math here like roation
        var verts = this.rectVerts(pos, whv);
        if (rot && rot != 0) {
            // apply roation
            verts[0] = MathLib.rotatePoint2(verts[0], rot);
            verts[1] = MathLib.rotatePoint2(verts[1], rot);
            verts[2] = MathLib.rotatePoint2(verts[2], rot);
            verts[3] = MathLib.rotatePoint2(verts[3], rot);
        }
        if (!fill)
            this.connectPoints2(verts, color, borderSize);
        if (fill)
            this.connectPoints2(verts, color, 1, true);
    }
    rect3d(pos, whv, cam, color, fill, borderSize, rot) {
        /**
         * @arg pos centered & translated cords (this is a position)
         * @arg whv width & height vector
         * @arg color color string (stroke style)
         */
        // 2d rect in 3d space
        var verts = this.rectVerts(new Vec2(pos.x, pos.y), whv);
        var verts3d = this.verts2dToverts3d(verts, pos.z); // convert to 3d points
        // this is just a 2d object in 3d space so we just have one face
        // but our rotate faces and draw faces function take multiple faces so we 
        // have to wrap it in an array
        var faces = [
            verts3d
        ];
        var projectedPoints = [];
        if (rot) {
            // apply roation
            faces = this.rotateFaces([verts3d], rot);
        }
        // array of faces
        this.drawFaces(faces, cam, color, fill, borderSize);
    }
    rectCanvas(pos, whv, color, fill, borderSize) {
        /**
         * @arg pos centered & translated cords (this is a position)
         * @arg whv width & height vector
         * @arg color color string (stroke style)
         */
        if (!borderSize)
            borderSize = 1;
        pos = this.cm.translate2(pos);
        if (!fill) {
            this.cm.ctx.strokeStyle = color.toString();
            this.cm.ctx.lineWidth = borderSize;
            this.cm.ctx.strokeRect((pos.x - (whv.x / 2)), (pos.y - (whv.y / 2)), whv.x, whv.y);
        }
        else {
            this.cm.ctx.fillStyle = color.toString();
            this.cm.ctx.fillRect((pos.x - (whv.x / 2)), (pos.y - (whv.y / 2)), whv.x, whv.y);
        }
    }
    rectprism(pos, whdv, cam, color, fill, borderSize, rot) {
        /**
         * @arg pos centered & translated cords (this is a position)
         * @arg whdv width, height & depth vector
         * @arg color color string (stroke style)
         */
        var verts = this.rectprismVerts(pos, whdv);
        var projectedPoints = [];
        if (rot) {
            // apply roation
            verts = this.rotateFaces(verts, rot);
        }
        // array of faces
        this.drawFaces(verts, cam, color, fill, borderSize);
    }
    // -------Rects------- (end)
    // #########################
    // -------Circles------- (start)
    circleCanvas(pos, r, color, fill, borderSize) {
        /**
         * @param pos postion (vec2) (centred & translated)
         * @param r radius (number)
         * @param color color (Color instance)
         /*/
        pos = this.cm.translate2(pos); // topDown => cord plane
        this.cm.ctx.moveTo(pos.x - r / 2, pos.y + r / 2); // center
        this.cm.ctx.beginPath();
        this.cm.ctx.arc(pos.x, pos.y, r, 0, 360);
        if (fill) {
            this.cm.ctx.fillStyle = color.toString();
            this.cm.ctx.fill();
        }
        else {
            if (!borderSize)
                borderSize = 2;
            this.cm.ctx.strokeStyle = color.toString();
            this.cm.ctx.lineWidth = borderSize;
            this.cm.ctx.stroke();
        }
        this.cm.ctx.closePath();
    }
    // -------Circles------- (end)
    // ⚠️ Impoarnt Preformce Issues Most Likely Caused By This
    // (every 3d model is just triangles and therer made with this function) ⚠️
    connectPoints2(points, outline, lineWide, fill) {
        /**
         * @param origin
         * @param points
         * @param outline
         * @param lineWide
         */
        if (!lineWide)
            lineWide = 1;
        this.cm.ctx.beginPath();
        this.cm.ctx.lineWidth = lineWide;
        if (!fill)
            this.cm.ctx.strokeStyle = outline.toString();
        if (fill)
            this.cm.ctx.fillStyle = outline.toString();
        points.forEach(p => {
            p = this.cm.translate2(p);
            this.cm.ctx.lineTo(p.x, p.y);
        });
        var first = this.cm.translate2(points[0]);
        this.cm.ctx.lineTo(first.x, first.y); // go back to the first point to connect all points
        // otherwise it would be open and not be a polygon
        if (!fill)
            this.cm.ctx.stroke();
        if (fill)
            this.cm.ctx.fill();
        this.cm.ctx.closePath();
    }
    // -------Triangles------- (start)
    tri(pos, bhv, outline, borderSize, fill, rot) {
        /**
         * @param pos postion (vec2) (centred & translated)
         * @param bhv base & height (vec2)
         * @param color color (Color instance)
         * @param borderSize line width (defualt is 1)
         /*/
        // we dont translate here beacuse the draw points method dose this for us
        // if we dont the object will be at the bottom right corner
        if (!borderSize)
            borderSize = 1;
        // for clarity we have to do this twice
        // - we do this when drawing to center the object
        // - we do this again when calculating the points of the triangle
        // ⚠ its not a misake ⚠
        var verts = this.triangleVerts(pos, bhv);
        if (!rot) {
            rot = 0;
        }
        else {
            // apply roation
            verts[0] = MathLib.rotatePoint2(verts[0], rot);
            verts[1] = MathLib.rotatePoint2(verts[1], rot);
            verts[2] = MathLib.rotatePoint2(verts[2], rot);
        }
        if (fill)
            this.connectPoints2(verts, outline, borderSize, true);
        if (!fill)
            this.connectPoints2(verts, outline, borderSize, false);
    }
    // -------Triangles------- (end)
    // other
    drawPlane() {
        this.cm.ctx.strokeStyle = 'rgba(0,25,0,255)';
        this.cm.ctx.lineWidth = 5;
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
