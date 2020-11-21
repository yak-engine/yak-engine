import isCoordinateContained from "../helpers/is-coordinate-contained";
import Point from "../primitives/Point";
import Transform from "../primitives/transform";

export default class Quad {
    transform: Transform = Transform.empty;

    node: Point

    topLeftTree: Quad;
    topRightTree: Quad;
    bottomLeftTree: Quad;
    bottomRightTree: Quad;

    insert(node: Point): void {
        if (!node) {
            return;
        }

        if (isCoordinateContained(node, this.transform)) {
            return;
        }

        if (this.transform.x - (this.transform.x + this.transform.width) <= 1 && this.transform.y - (this.transform.y + this.transform.height)) {
            if (!node) {
                this.node = node;
            }

            return;
        }

        if (this.transform.x + (this.transform.x + this.transform.width) / 2 > this.node.x) {
            if ((this.transform.y + (this.transform.y + this.transform.height)) / 2 >= this.node.y) {
                // top left.
                if (this.topLeftTree) {
                    this.topLeftTree = new Quad();
                    // this.topLeftTree.transform.
                }
            }
            else {
                // bottom left.
            }
        }
    }
}