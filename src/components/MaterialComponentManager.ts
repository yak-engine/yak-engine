import Entity from "../entity";
import ComponentManager from "./ComponentManager";
import MaterialComponent from "./MaterialComponent";

export default class MaterialComponentManager {
    entities: Array<Entity> = new Array();
    materials: Array<MaterialComponent> = new Array();
}