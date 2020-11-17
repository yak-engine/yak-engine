import Layer from "./layer";

export default class Scene {
    name: string;
    rows: number;
    columns: number;
    spriteSize: number;
    tilesets: Array<string> = new Array();
    layers: Array<Layer> = new Array();
}