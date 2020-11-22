import Entity from "../entity";
import Component from "./Component";

export default class ComponentManager {
    entities: Array<Entity> = new Array();
    data: Array<Component> = new Array();

    entityDataMap: Map<number, number> = new Map();

    addComponentInstance(entity: Entity, component: Component): void {
        let index = this.entities.findIndex(x => x.id === entity.id);

        if (index === -1) {
            this.entities.push(entity);
        }
        else {
            throw "Entity alread has a collider component assigned.";
        }

        this.data.push(component);
        this.entityDataMap.set(entity.id, this.data.length - 1);
    }
}