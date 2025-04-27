export class Vec2 {
    // simple export class to handle points in 2d space
    // no oparator overloads tho 💔🥀
    x: number
    y: number
    public constructor(x: number, y?: number) {
        /**
         * @param x x position
         * @param y y position (if undefied y=x)
         */
        if (!y) y = x;
        this.x = x;
        this.y = y;
    }

    public add(other: Vec2): Vec2 {
        return new Vec2(other.x + this.x, this.y + other.y);
    }

    public sub(other: Vec2): Vec2 {
        return new Vec2(other.x - this.x, this.y - other.y);
    }

    public mul(other: Vec2): Vec2 {
        return new Vec2(other.x * this.x, this.y * other.y);
    }

    public div(other: Vec2): Vec2 {
        return new Vec2(other.x / this.x, this.y / other.y);
    }
}

export class Vec3 {
    // simple export class to handle points in 3d space
    // no oparator overloads tho 💔🥀
    x: number
    y: number
    z: number

    public constructor(x: number, y?: number, z?: number) {
        /**
         * @param x x position
         * @param y y position (if undfined y=x)
         * @param z z position (if undfined z=x)
         */
        if (!y) y = x;
        if (!z) z = x;
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public add(other: Vec3): Vec3 {
        return new Vec3(other.x + this.x, this.y + other.y, this.z + other.z);
    }

    public sub(other: Vec3): Vec3 {
        return new Vec3(other.x - this.x, this.y - other.y, this.z - other.z);
    }

    public mul(other: Vec3): Vec3 {
        return new Vec3(other.x * this.x, this.y * other.y, this.z * other.z);
    }

    public div(other: Vec3): Vec3 {
        return new Vec3(other.x / this.x, this.y / other.y, this.z / other.z);
    }
}