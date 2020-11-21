import { Logger } from "../../logging/logger";
import Point from "../../primitives/Point";
import Transform from "../../primitives/transform";
import Collider from "./collider";

export default class SquareCollider extends Collider {
    points: Array<Point> = new Array();

    constructor(transform: Transform) {
        super(transform);

        // this.transform = transform;

        // Top left.
        this.points.push(new Point(transform.x, transform.y));

        // Top right.
        this.points.push(new Point(transform.x + transform.width, transform.y));

        // Bottom left.
        this.points.push(new Point(transform.x, transform.y + transform.height));

        // Bottom right.
        this.points.push(new Point(transform.x + transform.width, transform.y + transform.height));
    }

    public onCollisionEnter(): void {
        Logger.info('Square collider trigger enter');
    }

    public onCollisionLeave(): void {
        Logger.info('Square collider trigger leave');
    }
}