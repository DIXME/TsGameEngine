/**
   * i want to fix my functions so theres just one 
   * function for each
   * shape that has alot of settings that are optinal
*/

import { CanvasManager } from "./CanvasManager.js";
import { Camera } from "./Camera.js";
import { Color } from "./Colors.js";
import { MathLib } from "./Math.js";
import { Vec2, Vec3 } from "./Vectors.js";
import { verts2d, verts3d, faces3d } from "./Types.js";
  
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
      const topLeftBack = new Vec3(pos.x - (whdv.x / 2), pos.y - (whdv.y / 2), pos.z - (whdv.z / 2));
      const topRightBack = new Vec3(pos.x + (whdv.x / 2), pos.y - (whdv.y / 2), pos.z - (whdv.z / 2));
      const bottomLeftBack = new Vec3(pos.x - (whdv.x / 2), pos.y + (whdv.y / 2), pos.z - (whdv.z / 2));
      const bottomRightBack = new Vec3(pos.x + (whdv.x / 2), pos.y + (whdv.y / 2), pos.z - (whdv.z / 2));
  
      const topLeftFront = new Vec3(pos.x - (whdv.x / 2), pos.y - (whdv.y / 2), pos.z + (whdv.z / 2));
      const topRightFront = new Vec3(pos.x + (whdv.x / 2), pos.y - (whdv.y / 2), pos.z + (whdv.z / 2));
      const bottomLeftFront = new Vec3(pos.x - (whdv.x / 2), pos.y + (whdv.y / 2), pos.z + (whdv.z / 2));
      const bottomRightFront = new Vec3(pos.x + (whdv.x / 2), pos.y + (whdv.y / 2), pos.z + (whdv.z / 2));
  
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
  
    pyrimidVerts(pos: Vec3, bhdv: Vec3) {
      const top = new Vec3(pos.x, pos.y + bhdv.y, pos.z - bhdv.z / 2)
      const bottomLeftFront = new Vec3(pos.x - (bhdv.x / 2), pos.y - (bhdv.y / 2), pos.z + (bhdv.z / 2));
      const bottomRightFront = new Vec3(pos.x + (bhdv.x / 2), pos.y - (bhdv.y / 2), pos.z + (bhdv.z / 2));
      const bottomLeftBack = new Vec3(pos.x - (bhdv.x / 2), pos.y - (bhdv.y / 2), pos.z - (bhdv.z / 2));
      const bottomRightBack = new Vec3(pos.x + (bhdv.x / 2), pos.y - (bhdv.y / 2), pos.z - (bhdv.z / 2));
  
      return [
        [top, bottomLeftFront, bottomRightFront], // front tri
        [top, bottomLeftBack, bottomRightBack], // back tri
        [top, bottomLeftBack, bottomLeftFront], // left tri
        [top, bottomRightBack, bottomRightFront], // right tri
        [bottomLeftBack, bottomRightBack, bottomRightFront, bottomLeftFront]
      ]
    }
  
    rectVerts(pos: Vec2, whv: Vec2): verts2d {
      /**
       * @param pos centered & translated cords (this is a position)
       * @param whv width & height vector
       */
      var topLeft = new Vec2(pos.x - (whv.x / 2), pos.y - (whv.y / 2))
      var topRight = new Vec2(pos.x + (whv.x / 2), pos.y - (whv.y / 2))
      var bottomLeft = new Vec2(pos.x - (whv.x / 2), pos.y + (whv.y / 2))
      var bottomRight = new Vec2(pos.x + (whv.x / 2), pos.y + (whv.y / 2))
  
      return [
        bottomLeft,
        topLeft,
        topRight,
        bottomRight
      ]
    }
  
    triangleIcosVerts(pos: Vec2, bhv: Vec2): verts2d {
      /**
       * @param pos centered & translated cords (this is a position)
       * @param bhv base & height vector
       */
      var left = new Vec2(pos.x - (bhv.x / 2), pos.y + (bhv.y / 2))
      var right = new Vec2(pos.x + (bhv.x / 2), pos.y + (bhv.y / 2))
      var top = new Vec2(pos.x, pos.y - (bhv.y / 2))
  
      return [
        left,
        right,
        top
      ]
    }
  
    triangleVerts(pos: Vec2, bhv: Vec2): verts2d {
      /**
       * @param pos centered & translated cords (this is a position)
       * @param bhv base & height vector
       */
      var left = new Vec2(pos.x - (bhv.x / 2), pos.y + (bhv.y / 2))
      var right = new Vec2(pos.x + (bhv.x / 2), pos.y + (bhv.y / 2))
      var top = new Vec2(pos.x, pos.y - (bhv.y / 2))
  
      return [
        left,
        right,
        top
      ]
    }
  
    drawBackground() {
      // order matters!
      if (this.cm.settings.bg_color) this.clearScreenColor(this.cm.settings.bg_color);
      if (this.cm.settings.bg_img) this // we will draw an image instead of a background color if it is turned on
      if (this.cm.settings.B_plane) this.drawPlane();
    }
  
    verts2dToverts3d(verts: verts2d, z: number): verts3d {
      /**
       * @param verts array of points (verts2d)
       * @param z z position (number)
       */
      return verts.map(v => new Vec3(v.x, v.y, z)) as verts3d;
    }
  
    private rotateFaces(faces: faces3d, rotation: Vec3): faces3d {
      return faces.map(face =>
        face.map(point => MathLib.rotate3d(point, rotation))
      );
    }
  
    drawFaces(faces: faces3d, cam: Camera, color: Color, fill?: boolean, borderSize?: number): void {
      /**
       * @param faces array of faces (array of points)
       * @param cam camera object (Camera instance)
       * @param color color string (stroke style)
       * @param fill fill the shape or not (default is false)
       * @param borderSize line width (default is 1)
       */
      if (!borderSize) borderSize = 1;
      faces.forEach(face => {
        const projectedFace: Vec2[] = face.map(p => MathLib.projectPoint3(p, cam)) as Vec2[];
        if (!fill) this.connectPoints2(projectedFace, color, borderSize);
        if (fill) this.connectPoints2(projectedFace, color, 1, true);
      })
    }
  
    drawFacesTextrue(faces: faces3d, cam: Camera, image: HTMLImageElement, borderSize?: number): void {
      /**
       * @param faces array of faces (array of points)
       * @param cam camera object (Camera instance)
       * @param color color string (stroke style)
       * @param fill fill the shape or not (default is false)
       * @param borderSize line width (default is 1)
       */
      if (!borderSize) borderSize = 1;
      faces.forEach(face => {
        const projectedFace: Vec2[] = face.map(p => MathLib.projectPoint3(p, cam)) as Vec2[];
        this.connectPoints2(projectedFace, new Color(0, 0, 0), 1, false, image);
      })
    }
  
    pyrimid(pos: Vec3, bhdv: Vec3, rot: Vec3, cam: Camera, color: Color, borderSize: number, fill?: boolean) {
      var faces: faces3d = this.pyrimidVerts(pos, bhdv)
      if (rot) faces = this.rotateFaces(faces, rot)
      this.drawFaces(faces, cam, color, fill, borderSize)
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
      if (rot && rot != 0) {
        // apply roation
        verts[0] = MathLib.rotatePoint2(verts[0], rot);
        verts[1] = MathLib.rotatePoint2(verts[1], rot);
        verts[2] = MathLib.rotatePoint2(verts[2], rot);
        verts[3] = MathLib.rotatePoint2(verts[3], rot);
      }
      if (!fill) this.connectPoints2(verts, color, borderSize);
      if (fill) this.connectPoints2(verts, color, 1, true);
    }
  
  
    rect3d(pos: Vec3, whv: Vec2, cam: Camera, color: Color, fill?: boolean, borderSize?: number, rot?: Vec3): void {
      /**
       * @arg pos centered & translated cords (this is a position)
       * @arg whv width & height vector
       * @arg color color string (stroke style)
       */
      // 2d rect in 3d space
      var verts: verts2d = this.rectVerts(new Vec2(pos.x, pos.y), whv);
      var verts3d: verts3d = this.verts2dToverts3d(verts, pos.z); // convert to 3d points
      // this is just a 2d object in 3d space so we just have one face
      // but our rotate faces and draw faces function take multiple faces so we 
      // have to wrap it in an array
      var faces: faces3d = [
        verts3d
      ]
      var projectedPoints: verts2d = [];
  
      if (rot) {
        // apply roation
        faces = this.rotateFaces([verts3d], rot);
      }
  
      // array of faces
      this.drawFaces(faces, cam, color, fill, borderSize);
    }
  
    rectCanvas(pos: Vec2, whv: Vec2, color: Color, fill?: boolean, borderSize?: number): void {
      if (!borderSize) borderSize = 1;
      pos = this.cm.translate2(pos);
      if (!fill) {
        this.cm.ctx.strokeStyle = color.toString();
        this.cm.ctx.lineWidth = borderSize;
        this.cm.ctx.strokeRect(pos.x - whv.x / 2, pos.y - whv.y / 2, whv.x, whv.y);
      } else {
        this.cm.ctx.fillStyle = color.toString();
        this.cm.ctx.fillRect(pos.x - whv.x / 2, pos.y - whv.y / 2, whv.x, whv.y);
      }
    }
  
    rectprism(pos: Vec3, whdv: Vec3, cam: Camera, color: Color, fill?: boolean, borderSize?: number, rot?: Vec3, image?: HTMLImageElement): void {
      /**
       * @arg pos centered & translated cords (this is a position)
       * @arg whdv width, height & depth vector
       * @arg color color string (stroke style)
       */
      var verts: faces3d = this.rectprismVerts(pos, whdv);
  
      if (rot) {
        // apply roation
        verts = this.rotateFaces(verts, rot);
      }
  
      // array of faces
      if (!image) this.drawFaces(verts, cam, color, fill, borderSize);
      if (image) this.drawFacesTextrue(verts, cam, image)
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
      if (fill) {
        this.cm.ctx.fillStyle = color.toString();
        this.cm.ctx.fill();
      } else {
        if (!borderSize) borderSize = 2;
        this.cm.ctx.strokeStyle = color.toString();
        this.cm.ctx.lineWidth = borderSize;
        this.cm.ctx.stroke();
      }
      this.cm.ctx.closePath();
    }
  
    // -------Circles------- (end)
  
    // ⚠️ Impoarnt Preformce Issues Most Likely Caused By This
    // (every 3d model is just triangles and therer made with this function) ⚠️
    connectPoints2(points: verts2d, outline: Color, lineWide?: number, fill?: boolean, img?: HTMLImageElement): void {
      /**
       * @param origin
       * @param points
       * @param outline
       * @param lineWide
       */
      if (!lineWide) lineWide = 1
      this.cm.ctx.beginPath();
      this.cm.ctx.lineWidth = lineWide;
      if (!fill) this.cm.ctx.strokeStyle = outline.toString();
      if (fill) this.cm.ctx.fillStyle = outline.toString();
      if (img) {
        const pattern = this.cm.ctx.createPattern(img, "repeat") as CanvasPattern // or "no-repeat", "repeat-x", "repeat-y" 
        this.cm.ctx.fillStyle = pattern
      }
      const translatedPoints = points.map(p => this.cm.translate2(p));
      translatedPoints.forEach(p => {
        this.cm.ctx.lineTo(p.x, p.y)
        //this.cm.ctx.fillStyle = 'green'
        //this.cm.ctx.fillRect(p.x-2.5,p.y-2.5,5,5) //debug
      });
      var first = this.cm.translate2(points[0]);
      this.cm.ctx.lineTo(first.x, first.y); // go back to the first point to connect all points
      // otherwise it would be open and not be a polygon
      if (!fill && !img) this.cm.ctx.stroke()
      if (fill && !img) this.cm.ctx.fill()
      this.cm.ctx.closePath();
      if (img) {
        this.cm.ctx.fill()
      }
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
  
      var verts: verts2d = this.triangleVerts(pos, bhv);
  
      if (!rot) {
        rot = 0;
      } else {
        // apply roation
        verts[0] = MathLib.rotatePoint2(verts[0], rot);
        verts[1] = MathLib.rotatePoint2(verts[1], rot);
        verts[2] = MathLib.rotatePoint2(verts[2], rot);
      }
  
      if (fill) this.connectPoints2(verts, outline, borderSize, true);
      if (!fill) this.connectPoints2(verts, outline, borderSize, false);
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