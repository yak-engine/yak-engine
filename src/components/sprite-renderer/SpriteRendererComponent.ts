import Component from "../Component";

export default class SpriteRendererComponent extends Component {
    layer: number;
    tileset: number;
    row?: number;
    column?: number;

    constructor(layer?: number, tileset?: number, row?: number, column?: number) {
        super();

        this.layer = layer;
        this.tileset = tileset;
        this.row = row;
        this.column = column;
    }
}