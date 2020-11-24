import Point from "../../primitives/Point";
import Transform from "../../primitives/transform";
import Component from "../Component";

export default class ColliderComponent extends Component {
    public isTrigger: boolean = false;
    public transform: Transform;

    private isColliding: boolean =false;
    private points: Array<Point> = new Array();

    constructor(transform: Transform, isTrigger: boolean = false) {
        super();

        this.transform = transform;
        this.isTrigger = isTrigger;

        // Top left.
        this.points.push(new Point(transform.x, transform.y));

        // Top right.
        this.points.push(new Point(transform.x + transform.width, transform.y));

        // Bottom left.
        this.points.push(new Point(transform.x, transform.y + transform.height));

        // Bottom right.
        this.points.push(new Point(transform.x + transform.width, transform.y + transform.height));
    }
}