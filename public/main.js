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
import { pos2, pos3 } from "./out/Functions.js";
import { Camera } from "./out/Camera.js";
import { rectprism, rect3d, rect2d } from "./out/GameObject.js"
import { Scene } from "./out/Scene.js";
import { KeyboardManager } from "./out/Keyboard.js";
import { CameraController } from "./out/CameraController.js";

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

const cam = new Camera(
    pos3(0, 0, 500),  // Camera position
    pos3(0, 0, 0),     // Camera rotation
    50,                // FOV
    window.innerWidth / window.innerHeight, // Proper aspect ratio
    0.1,               // Near plane
    1000               // Far plane
);

const box = new rectprism(
    pos3(0),     // Position
    pos3(25), // Size (width, height, depth)
    colors.red
)

const box2 = new rect3d(
    pos3(-10),     // Position
    pos3(25), // Size (width, height, depth)
    pos3(35),
    colors.red     // Opacity
)

const xAxis = new rectprism(
    pos3(50, 0, 0),    // Position: half the length on positive X
    pos3(100, 2, 2),   // Size: longer in X, thin in Y and Z
    colors.red
);

const yAxis = new rectprism(
    pos3(0, 50, 0),    // Position: half the length on positive Y
    pos3(2, 100, 2),   // Size: longer in Y, thin in X and Z
    colors.green
);

const zAxis = new rectprism(
    pos3(0, 0, 50),    // Position: half the length on positive Z
    pos3(2, 2, 100),   // Size: longer in Z, thin in X and Y
    colors.blue
);

const box2s = new rect2d(
    pos2(0),
    pos2(25), // Size (width, height)
    5,
    colors.red
)

const scene = new Scene([],[zAxis, xAxis, yAxis], cam, g);
const keyboard = new KeyboardManager();
const player = new CameraController(cam, keyboard);

scene.loop();