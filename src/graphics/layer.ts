import Entity from "../entity";
import Sprite from "./sprite";

export default class Layer extends Entity {
    name: string;
    enabled: boolean = true;

    /**
     * TODO: Remove this property there is going to be a dedicated tilemap component.
     */
    tileset: number;

    /**
     * TODO: Remove this property there is going dedicated components to handle storing this information.
     */
    sprites: Array<number> = new Array();

    constructor(name: string) {
        super();
    }
}