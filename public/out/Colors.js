export class Color {
    constructor(r, g, b, a = 255) {
        /**
        * @param r red (rgba color) (max 255)
        * @param g green (rgba color) (max 255)
        * @param b blue (rgba color) (max 255)
        * @param a opacity (rgba color) (max 255)
        */
        this.r = r;
        this.b = b;
        this.g = g;
        this.a = a;
        this.case();
    }
    check() {
        // if any values are over 255
        if (this.r > 255 ||
            this.g > 255 ||
            this.b > 255 ||
            this.a > 255)
            return false;
        // else
        return true;
    }
    case() {
        if (!this.check()) {
            throw "Error Color Values Cannot Execed 255!";
        }
    }
    toString() {
        this.case(); // safe case so if they are above 255 we notice before the canvas dose (so we cab throw an error)
        return `rgba(${this.r},${this.g},${this.b},${this.a})`;
    }
    toStringRGB() {
        this.case(); // safe case so if they are above 255 we notice before the canvas dose (so we cab throw an
        return `rgb(${this.r},${this.g},${this.b})`;
    }
}
export class colorsClass {
    constructor() {
        // export class of preset colors
        this.black = new Color(255, 255, 255, 255);
        this.white = new Color(0, 0, 0, 255);
        this.red = new Color(255, 0, 0, 255);
        this.green = new Color(0, 255, 0, 255);
        this.blue = new Color(0, 0, 255, 255);
    }
}
