import { pos2 } from "./Functions.js";
export class Graphics {
    // b stands for bool
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
    drawBackground() {
        // order matters!
        if (this.cm.settings.bg_color)
            this.clearScreenColor(this.cm.settings.bg_color);
        if (this.cm.settings.bg_img)
            this; // we will draw an image instead of a background color if it is turned on
        if (this.cm.settings.B_plane)
            this.drawPlane();
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
    fillRectCanvas(pos, whv, color) {
        /**
         * @arg pos centered & translated cords (this is a position)
         * @arg whv width & height vector
         * @arg color color string (stroke style)
         */
        this.cm.ctx.fillStyle = color.toString();
        pos = this.cm.translate2(pos);
        // translate cords (topLeft => cord plane)
        this.cm.ctx.fillRect((pos.x - (whv.x / 2)), (pos.y - (whv.y / 2)), whv.x, whv.y);
    }
    outlineRect(pos, whv, color, borderSize = 1) {
        /**
         * @arg pos centered & translated cords (this is a position)
         * @arg whv width & height vector
         * @arg color color string (stroke style)
         */
        this.cm.ctx.strokeStyle = color.toString();
        this.cm.ctx.lineWidth = borderSize;
        pos = this.cm.translate2(pos);
        // translate cords (topLeft => cord plane)
        this.cm.ctx.strokeRect((pos.x - (whv.x / 2)), (pos.y - (whv.y / 2)), whv.x, whv.y);
    }
    drawRectCanvas(pos, whv, fill, outline, borderSize, Bfill, Boutline) {
        if (Bfill)
            this.outlineRect(pos, whv, outline, borderSize);
        if (Boutline)
            this.fillRectCanvas(pos, whv, fill);
    }
    // -------Rects------- (end)
    // #########################
    // -------Circles------- (start)
    outlineCircleCanvas(pos, r, color, borderSize) {
        /**
         * @param pos postion (vec2) (centred & translated)
         * @param r radius (number)
         * @param color color (Color instance)
         * @param borderSize line width (defualt is 1)
         /*/
        pos = this.cm.translate2(pos); // topDown => cord plane
        if (!borderSize) {
            borderSize = 1;
        }
        this.cm.ctx.lineWidth = borderSize;
        this.cm.ctx.strokeStyle = color.toString();
        this.cm.ctx.moveTo(pos.x - r / 2, pos.y + r / 2); // center
        this.cm.ctx.beginPath();
        this.cm.ctx.arc(pos.x, pos.y, r, 0, 360);
        this.cm.ctx.stroke();
        this.cm.ctx.closePath();
    }
    fillCircleCanvas(pos, r, color) {
        /**
         * @param pos postion (vec2) (centred & translated)
         * @param r radius (number)
         * @param color color (Color instance)
         /*/
        pos = this.cm.translate2(pos); // topDown => cord plane
        this.cm.ctx.fillStyle = color.toString();
        this.cm.ctx.moveTo(pos.x - r / 2, pos.y + r / 2); // center
        this.cm.ctx.beginPath();
        this.cm.ctx.arc(pos.x, pos.y, r, 0, 360);
        this.cm.ctx.fill();
        this.cm.ctx.closePath();
    }
    drawCircleCanvas(pos, r, fill, outline, borderSize, Bfill, Boutline) {
        if (Bfill)
            this.outlineCircleCanvas(pos, r, outline, borderSize);
        if (Boutline)
            this.fillCircleCanvas(pos, r, fill);
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
    outlineTri(pos, bhv, outline, borderSize) {
        /**
         * @param pos postion (vec2) (centred & translated)
         * @param bhv base & height (vec2)
         * @param color color (Color instance)
         * @param borderSize line width (defualt is 1)
         /*/
        // we dont translate here beacuse the draw points method dose this for us
        // if we dont the object will be at the bottom right corner
        if (!borderSize) {
            borderSize = 1;
        }
        // for clarity we have to do this twice
        // - we do this when drawing to center the object
        // - we do this again when calculating the points of the triangle
        // ⚠ its not a misake ⚠
        const left = pos2(pos.x - bhv.x / 2, pos.y + bhv.y / 2);
        const right = pos2(pos.x + bhv.x / 2, pos.y + bhv.y / 2);
        const top = pos2(pos.x, pos.y - bhv.y / 2);
        this.connectPoints2([left, right, top], outline, borderSize);
    }
    fillTri(pos, bhv, outline, borderSize) {
        /**
         * @param pos postion (vec2) (centred & translated)
         * @param bhv base & height (vec2)
         * @param color color (Color instance)
         * @param borderSize line width (defualt is 1)
         /*/
        // we dont translate here beacuse the draw points method dose this for us
        // if we dont the object will be at the bottom right corner
        if (!borderSize) {
            borderSize = 1;
        }
        // for clarity we have to do this twice
        // - we do this when drawing to center the object
        // - we do this again when calculating the points of the triangle
        // ⚠ its not a misake ⚠
        const left = pos2(pos.x - bhv.x / 2, pos.y + bhv.y / 2);
        const right = pos2(pos.x + bhv.x / 2, pos.y + bhv.y / 2);
        const top = pos2(pos.x, pos.y - bhv.y / 2);
        this.connectPoints2([left, right, top], outline, borderSize, true);
    }
    drawTri(pos, bhv, fill, outline, borderSize, Bfill, Boutline) {
        if (Bfill)
            this.outlineTri(pos, bhv, outline, borderSize);
        if (Boutline)
            this.fillTri(pos, bhv, fill);
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
