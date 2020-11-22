import Component from "../Component";

export default class TileMapComponent extends Component {
    tiles: Array<number>;

    constructor(tiles?: Array<number>) {
        super();
        this.tiles = tiles;
    }
}