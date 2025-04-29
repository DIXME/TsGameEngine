// we whant our game objects to not contain the grapics and camera export classes but to be passed them
// in thier overieded draw method
import { Vec2, Vec3 } from "./Vectors.js";
import { Color } from "./Colors.js";
export class GameObject {
}
export class GameObject2d extends GameObject {
    constructor(pos, rot, color) {
        super();
        this.pos = pos;
        this.vel = new Vec2(0);
        this.rot = rot;
        this.rotVel = 0;
        this.color = color;
    }
    // can set vel to zero by pushing a vec2 with 0,0
    draw(g) {
        // in a sub export class they would just draw there 
        // object here and not call this method
        // so this is just a placeholder for the draw methods
    }
    tick(g) {
        this.pos = this.pos.add(this.vel);
        this.vel = this.vel.mul(new Vec3(0.99)); // friction
        this.rot += this.rotVel;
        this.rotVel *= 0.99; // friction
        this.draw(g);
    }
    push(vel) {
        this.vel = this.vel.add(vel);
    }
    setPos(pos) {
        this.pos = pos;
    }
    getPos() {
        return this.pos;
    }
    getVel() {
        return this.vel;
    }
    getRot() {
        return this.rot;
    }
    getColor() {
        return this.color;
    }
    setRot(rot) {
        this.rot = rot;
    }
    setRotVel(rotVel) {
        this.rotVel = rotVel;
    }
    getRotVel() {
        return this.rotVel;
    }
    setVel(vel) {
        this.vel = vel;
    }
}
export class GameObject3d extends GameObject {
    constructor(pos, rot, color) {
        super();
        this.pos = pos;
        this.vel = new Vec3(0);
        this.rot = rot;
        this.rotVel = new Vec3(0);
        this.color = color;
    }
    draw(g, cam) {
        // in a sub export class they would just draw there 
        // object here and not call this method
        // so this is just a placeholder for the draw methods
    }
    tick(g, cam) {
        this.pos = this.pos.add(this.vel);
        this.vel = this.vel.mul(new Vec3(0.99)); // friction
        this.rot = this.rot.add(this.rotVel);
        this.rotVel = this.rotVel.mul(new Vec3(0.99)); // friction
        this.draw(g, cam);
    }
    push(vel) {
        this.vel = this.vel.add(vel);
    }
    pushRot(vel) {
        this.rotVel = this.rotVel.add(vel);
    }
    setPos(pos) {
        this.pos = pos;
    }
    getPos() {
        return this.pos;
    }
    getVel() {
        return this.vel;
    }
    getRot() {
        return this.rot;
    }
    getColor() {
        return this.color;
    }
}
export class rect2d extends GameObject2d {
    // all we need to do is just overide the draw function beacuse are parent export class already dose most of the work for us
    constructor(pos, whv, rot, color) {
        super(pos, rot, color);
        this.whv = whv;
    }
    draw(g) {
        g.rect(this.getPos(), this.whv, this.getColor(), false, 1, this.getRot());
    }
    tick(g) {
        this.setPos(this.getPos().add(this.getVel()));
        this.setVel(this.getVel().mul(new Vec2(0.99))); // friction
        this.setRot(this.getRot() + this.getRotVel());
        this.setRotVel(this.getRotVel() * 0.99); // friction
    }
}
export class rectprism extends GameObject3d {
    constructor(pos, whv, color, tex) {
        super(pos, new Vec3(0), color);
        this.whv = whv;
        this.tex = tex;
    }
    draw(g, cam) {
        if (!this.tex)
            g.rectprism(this.getPos(), this.whv, cam, this.getColor(), false, 1, this.getRot());
        if (this.tex)
            g.rectprism(this.getPos(), this.whv, cam, new Color(0, 0, 0), false, 1, this.getRot(), this.tex);
    }
}
export class pyrimid extends GameObject3d {
    constructor(pos, bhdv, rot, color) {
        super(pos, rot, color);
        this.bhdv = bhdv;
    }
    draw(g, cam) {
        g.pyrimid(this.getPos(), this.bhdv, this.getRot(), cam, this.getColor(), 1, false);
    }
}
