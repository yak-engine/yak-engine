import Entity from "../entity";
import Sprite from "./sprite";

export default class Layer extends Entity {
    name: string;
    enabled: boolean = true;
    tileset: number;
    sprites: Array<number> = new Array();

    constructor(name: string) {
        super();
    }
}