import { Color, colorsClass } from "./out/Colors.js";
import { CanvasManager } from "./out/CanvasManager.js";
import { Graphics } from "./out/Graphics.js";
import { Vec2, Vec3 } from "./out/Vectors.js";
import { Camera } from "./out/Camera.js";
import { rectprism, rect2d, pyrimid } from "./out/GameObject.js";
import { Scene } from "./out/Scene.js";
import { KeyboardManager } from "./out/Keyboard.js";
import { CameraController } from "./out/CameraController.js";

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
    new Vec3(0, 0, 500),  // Camera position
    new Vec3(0, 0, 0),     // Camera rotation
    60,                // FOV
    window.innerWidth / window.innerHeight, // Proper aspect ratio
    0.001,               // Near plane
    10000               // Far plane
);

const xAxis = new rectprism(
    new Vec3(50, 0, 0),    // Position: half the length on positive X
    new Vec3(100, 2, 2),   // Size: longer in X, thin in Y and Z
    colors.red
);

const yAxis = new rectprism(
    new Vec3(0, 50, 0),    // Position: half the length on positive Y
    new Vec3(2, 100, 2),   // Size: longer in Y, thin in X and Z
    colors.green
);

const zAxis = new rectprism(
    new Vec3(0, 0, 50),    // Position: half the length on positive Z
    new Vec3(2, 2, 100),   // Size: longer in Z, thin in X and Y
    colors.blue
);

const box2s = new rect2d(
    new Vec2(0),
    new Vec2(25), // Size (width, height)
    5,
    colors.red
)

const pyrimid1 = new pyrimid(new Vec3(0), new Vec3(50), new Vec3(35), coolColor1)

const box = new rectprism(
    new Vec3(0),     // Position
    new Vec3(25), // Size (width, height, depth)
    coolColor2
)

const scene = new Scene([], [], cam, g);
const keyboard = new KeyboardManager();
//fix 2d scene objects not working latter
const player = new CameraController(cam, keyboard);

const boxes = []

for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
        boxes.push(new rectprism(
        new Vec3(-100 + (45 * (x + 1)), y * 45, 0),
        new Vec3(25),
        coolColor1
        ))
        scene.addObject(boxes[boxes.length - 1])
    }
}

scene.addObject(keyboard);
scene.callBack = () => {
    boxes.forEach((b, i) => {
        b.pushRot(new Vec3(Math.random()/100))
    })
}

scene.loop()

/*
- problem description (vertices broken)
the prymids vertices are for some reason being distored
the pyrimid being in the scene also distrorts other objects like a cube
porolly somthing involing the rotation martix i doubt its the projection martix
i think its beacuse i tried to use chatgpt to fix my porblems but
suppirse supprise it diddnt work
so im going to rewrite the entire math libbary to use martixices
*/
