import Transform from "../../primitives/transform";
import Component from "../Component";

export default class SpriteRendererComponent extends Component {
    transform: Transform;
    layer: number;
    tileset: number;
    row?: number;
    column?: number;

    constructor(transform?: Transform, layer?: number, tileset?: number, row?: number, column?: number) {
        super();

        this.transform = transform;
        this.layer = layer;
        this.tileset = tileset;
        this.row = row;
        this.column = column;
    }
}