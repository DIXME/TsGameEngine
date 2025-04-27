/**
 *  e↸ζ∃🡧
 * - i litterlay cant spell i dont know why or how i am able
 *   to code when i cant spell so my bad yo (i can sometimes
 *   but is really bad as you can see)
 *
 * - i love critisum i know nobody will read this but please
 *   do
 */

/**
 * 🚀 Goals 🚀
 * - make a function that handles drawing shapes with roation
 * and merge the two methods (the way it knows what to do is a paramater)
 * the parameter is opitinal and the defualt value is false (outline: defualt)
 *
 * - draw 3d shapes (3d projection)
 *
 * - create real gameObjects that update after we
 * create rendering functions
 *
 * - figure out how to rotate a circle
 *
 * - make images
 *
 * - make image game Obejcts
 */

/** ⚠️ Keep In Mind ⚠️
 * when we get to 2d & 3d roation we have to keep in mind that what where doing is
 * getting the martix
 * applying the martix to all points of the polygon
 * this means that we need to make our own function to create rects and other shapes that draw them
 * based on there points and not ctx.fillRect
 */

// basic setup

// make your own rgba colors to use

// game scenes and loops will be handled by classes but we want to finsh all rending stuff first

import { CanvasManager } from "./out/CanvasManager.js";
import { Graphics } from "./out/Graphics.js";
import { Color, colorsClass } from "./out/Colors.js";
import { pos2 } from "./out/Functions.js";

const coolColor1 = new Color(200, 100, 210);
const coolColor2 = new Color(32, 60, 13);

const colors = new colorsClass();
var cm = new CanvasManager("canvas");
var g = new Graphics(colors.black, cm);

// Full screen
cm.fix();

// Draw stuff
g.cm.settings.B_plane = true;
g.cm.settings.bg_color = "black";
g.drawBackground();

g.rect(pos2(0), pos2(25), coolColor1, false, 2);
g.circleCanvas(pos2(0), 12, coolColor1, false, 2);
g.tri(pos2(0, 0), pos2(25), coolColor1, 2, false, 2);