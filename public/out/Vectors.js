export class Vec2 {
    constructor(x, y) {
        /**
         * @param x x position
         * @param y y position (if undefied y=x)
         */
        if (!y)
            y = x;
        this.x = x;
        this.y = y;
    }
    add(other) {
        return new Vec2(other.x + this.x, this.y + other.y);
    }
    sub(other) {
        return new Vec2(other.x - this.x, this.y - other.y);
    }
    mul(other) {
        return new Vec2(other.x * this.x, this.y * other.y);
    }
    div(other) {
        return new Vec2(other.x / this.x, this.y / other.y);
    }
}
export class Vec3 {
    constructor(x, y, z) {
        /**
         * @param x x position
         * @param y y position (if undfined y=x)
         * @param z z position (if undfined z=x)
         */
        if (!y)
            y = x;
        if (!z)
            z = x;
        this.x = x;
        this.y = y;
        this.z = z;
    }
    add(other) {
        return new Vec3(other.x + this.x, this.y + other.y, this.z + other.z);
    }
    sub(other) {
        return new Vec3(other.x - this.x, this.y - other.y, this.z - other.z);
    }
    mul(other) {
        return new Vec3(other.x * this.x, this.y * other.y, this.z * other.z);
    }
    div(other) {
        return new Vec3(other.x / this.x, this.y / other.y, this.z / other.z);
    }
}
