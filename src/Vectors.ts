import { matrix, point3 } from "./Types";

export class Vec3 {
    public x: number
    public y: number
    public z: number

    constructor(x: number, y?: number, z?: number){
        if(y == undefined) y = x;
        if(z == undefined) z = y;
        this.x = x;
        this.y = y;
        this.z = z;
    }

    add(v: Vec3): void {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
    }

    sub(v: Vec3): void {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
    }

    mul(v: Vec3): void {
        this.x *= v.x;
        this.y *= v.y;
        this.z *= v.z;
    }

    div(v: Vec3): void {
        this.x /= v.x;
        this.y /= v.y;
        this.z /= v.z;
    }

    opp(): point3 {
        return new Vec3(-this.x,-this.y,-this.z)
    }

    mt4(): matrix {
        return [
            [this.x],
            [this.y],
            [this.z],
            [1]
        ]
    }

    mt3(): matrix {
        return [
            [this.x],
            [this.y],
            [this.z]
        ]
    }

    static fromMt(mat: matrix) : Vec3 {
        return new Vec3(mat[0][0], mat[1][0], mat[2][0])
    }
}

export class Vec2 {
    public x: number
    public y: number

    constructor(x: number, y?: number){
        if(y == undefined) y = x;
        this.x = x;
        this.y = y;
    }

    add(v: Vec2): void {
        this.x += v.x;
        this.y += v.y;
    }

    sub(v: Vec2): void {
        this.x -= v.x;
        this.y -= v.y;
    }

    mul(v: Vec2): void {
        this.x *= v.x;
        this.y *= v.y;
    }

    div(v: Vec2): void {
        this.x /= v.x;
        this.y /= v.y;
    }

    opp(): Vec2 {
        return new Vec2(-this.x,-this.y)
    }

    mt2(): matrix {
        return [
            [this.x],
            [this.y]
        ]
    }

    mt3(): matrix {
        return [
            [this.x],
            [this.y],
            [0]
        ]
    }

    mt4(): matrix {
        return [
            [this.x],
            [this.y],
            [0],
            [1]
        ]
    }
}