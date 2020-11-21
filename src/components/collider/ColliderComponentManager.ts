import Entity from "../../entity";
import ComponentManager from "../ComponentManager";
import ColliderComponent from "./ColliderComponent";

export default class ColliderComponentManager extends ComponentManager {
    entities: Array<Entity> = new Array();
    colliders: Array<ColliderComponent> = new Array();
}