import Component from "../Component";

export default class TilemapComponent extends Component {
    tiles: Array<number>;

    constructor(tiles?: Array<number>) {
        super();
        this.tiles = tiles;
    }
}