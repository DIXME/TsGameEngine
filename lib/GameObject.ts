import { Vec2, Vec3 } from "./Vectors.js"
//import { new Vec2, new Vec3 } from "./Functions.js"
import { Graphics } from "./Graphics.js"
import { Camera } from "./Camera.js"
import { Color } from "./Colors.js"

// we whant our game objects to not contain the grapics and camera classes but to be passed them
// in thier overieded draw method

export class GameObject {
    // this is pretty much just a parent placeholder class
    // we just want every game object to be sub class of a gameobject so we 
    // can idefiefy them without making a holw bunch of or statments
}

export class GameObject2d extends GameObject {
    // this is a parent class placeholder as well
    // this can be used to ideinfey a 3d gameobject
    // and a 2d game object by type in a readable manner

    private pos: Vec2;
    private vel: Vec2; 
    private rot: number;
    private rotVel: number;
    private color: Color;

    constructor(pos: Vec2, rot: number, color: Color) {
        super();
        this.pos = pos;
        this.vel = new Vec2(0);
        this.rot = rot;
        this.rotVel = 0;
        this.color = color;
    }

    // can set vel to zero by pushing a vec2 with 0,0

    draw(g: Graphics): void {
        // in a sub class they would just draw there 
        // object here and not call this method
        // so this is just a placeholder for the draw methods
    }

    tick(g: Graphics): void {
        this.pos = this.pos.add(this.vel);
        this.vel = this.vel.mul(new Vec3(0.99)); // friction
        this.rot += this.rotVel;
        this.rotVel *= 0.99; // friction
        this.draw(g);
    }

    push(vel: Vec2): void {
        this.vel = this.vel.add(vel);
    }

    setPos(pos: Vec2): void {
        this.pos = pos;
    }

    getPos(): Vec2 {
        return this.pos;
    }

    getVel(): Vec2 {
        return this.vel;
    }

    getRot(): number {
        return this.rot;
    }

    getColor(): Color {
        return this.color;
    }

    setRot(rot: number): void {
        this.rot = rot;
    }

    setRotVel(rotVel: number): void {
        this.rotVel = rotVel;
    }

    getRotVel(): number {
        return this.rotVel;
    }

    setVel(vel: Vec2): void {
        this.vel = vel;
    }
}

export class GameObject3d extends GameObject {
    // same thing as the rest execpt it is for obejcts in 3d space
    private pos: Vec3;
    private vel: Vec3;
    private rot: Vec3;
    private rotVel: Vec3;
    private color: Color;

    constructor(pos: Vec3, rot: Vec3, color: Color) {
        super();
        this.pos = pos;
        this.vel = new Vec3(0);
        this.rot = rot;
        this.rotVel = new Vec3(0);
        this.color = color;
    }

    draw(g: Graphics, cam: Camera): void {
        // in a sub class they would just draw there 
        // object here and not call this method
        // so this is just a placeholder for the draw methods
    }

    tick(g: Graphics, cam: Camera): void {
        this.pos = this.pos.add(this.vel);
        this.vel = this.vel.mul(new Vec3(0.99)); // friction
        this.rot = this.rot.add(this.rotVel);
        this.rotVel = this.rotVel.mul(new Vec3(0.99)); // friction
        this.draw(g, cam);
    }

    push(vel: Vec3): void {
        this.vel = this.vel.add(vel);
    }

    setPos(pos: Vec3): void {
        this.pos = pos;
    }

    getPos(): Vec3 {
        return this.pos;
    }

    getVel(): Vec3 {
        return this.vel;
    }

    getRot(): Vec3 {
        return this.rot;
    }

    getColor(): Color {
        return this.color;
    }
}

export class rect2d extends GameObject2d {
  private whv: Vec2;

  // all we need to do is just overide the draw function beacuse are parent class already dose most of the work for us

  constructor(pos: Vec2, whv: Vec2, rot: number, color: Color){
    super(pos,rot,color);
    this.whv = whv; 
  }

  draw(g: Graphics): void {
    g.rect(this.getPos(), this.whv, this.getColor(), false, 1, this.getRot());
  }

  tick(g: Graphics): void {
    this.setPos(this.getPos().add(this.getVel()));
    this.setVel(this.getVel().mul(new Vec2(0.99))); // friction
    this.setRot(this.getRot() + this.getRotVel());
    this.setRotVel(this.getRotVel() * 0.99); // friction
  }
}

export class rectprism extends GameObject3d {
    private whv: Vec3;

    constructor(pos: Vec3, whv: Vec3, color: Color) {
        super(pos, new Vec3(0), color);
        this.whv = whv;
    }

    draw(g: Graphics, cam: Camera): void {
        g.rectprism(this.getPos(), this.whv, cam, this.getColor(), false, 1, this.getRot());
    }
}

export class rect3d extends GameObject {
    // this is a 2d rect in 3d space
    // it is a sub class of gameobject beacuse it is 3d nor 2d
    private pos: Vec3;
    private vel: Vec3;
    private rot: Vec3;
    private rotVel: Vec3;
    private color: Color;
    private whv: Vec2; // width height and depth vector

    constructor(pos: Vec3, whv: Vec2, rot: Vec3, color: Color) {
        super();
        this.pos = pos;
        this.vel = new Vec3(0);
        this.rot = rot;
        this.rotVel = new Vec3(0);
        this.color = color;
        this.whv = whv;
    }

    draw(g: Graphics, cam: Camera): void {
        g.rect3d(this.pos, this.whv, cam, this.color, false, 1, this.rot);
    }

    tick(g: Graphics, cam: Camera): void {
        this.pos = this.pos.add(this.vel);
        this.vel = this.vel.mul(new Vec3(0.99)); // friction
        this.rot = this.rot.add(this.rotVel);
        this.rotVel = this.rotVel.mul(new Vec3(0.99)); // friction
        this.draw(g, cam);
    }
}