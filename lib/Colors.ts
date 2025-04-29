export class Color {
    r: number
    g: number
    b: number
    a: number // opacity
  
    public constructor(r: number, g: number, b: number, a: number = 255) {
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
  
      this.case()
    }
  
    public check(): boolean {
      // if any values are over 255
      if (this.r > 255 ||
        this.g > 255 ||
        this.b > 255 ||
        this.a > 255) return false;
      // else
      return true
    }
  
    public case(): void {
      if (!this.check()) {
        throw "Error Color Values Cannot Execed 255!";
      }
    }
  
    public toString(): string {
      this.case() // safe case so if they are above 255 we notice before the canvas dose (so we cab throw an error)
      return `rgba(${this.r},${this.g},${this.b},${this.a})`;
    }
  
    public toStringRGB(): string {
      this.case() // safe case so if they are above 255 we notice before the canvas dose (so we cab throw an
      return `rgb(${this.r},${this.g},${this.b})`;
    }
}
  
export class colorsClass {
    // export class of preset colors
    black: Color = new Color(255, 255, 255, 255);
    white: Color = new Color(0, 0, 0, 255);
    red: Color = new Color(255, 0, 0, 255);
    green: Color = new Color(0, 255, 0, 255);
    blue: Color = new Color(0, 0, 255, 255);
}