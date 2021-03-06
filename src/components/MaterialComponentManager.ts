import Entity from "../entity";
import ComponentManager from "./ComponentManager";
import MaterialComponent from "./material/MaterialComponent";

export default class MaterialComponentManager extends ComponentManager {
    entities: Array<Entity> = new Array();
    materials: Array<MaterialComponent> = new Array();
}