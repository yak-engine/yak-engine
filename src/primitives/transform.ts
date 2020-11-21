import Camera from "../graphics/camera";
import { Logger } from "../logging/logger";

export default class Transform {
    x: number;
    y: number;

    width: number;
    height: number;

    fillStyle: string;

    constructor(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    getScreenX(camera: Camera): number {
        return this.x - camera.viewport.x;
    }

    // clampX(min: number, maxLowerRange: number, maxUpperRange: number): void {
    //     this.x = Math.max(min, Math.min(maxLowerRange, maxUpperRange));  
    // }

    clampX(min: number, max: number): void {
        if (this.x < min) {
            this.x = min;
            return;
        }

        if (this.x > max) {
            this.x = max;
            return;
        }
    }

    clampY(min: number, max: number): void {
        if (this.y < min) {
            this.y = min;
            return;
        }

        if (this.y > max) {
            this.y = max;
            return;
        }
    }

    /**
     * Returns a new empty transform object. Meaning the x, y, width, and height
     * values are all zero.
     * 
     * @author NSSure
     * @since 11/12/2020
     */
    static get empty(): Transform {
        return new Transform(0, 0, 0, 0);
    }
}