import Entity from "../entity";

export default class ComponentManager {
    private static instance: ComponentManager;

    public static getInstance(): ComponentManager {
        if (!ComponentManager.instance) {
            ComponentManager.instance = new ComponentManager();
        }

        return ComponentManager.instance;
    }

    entities: Array<Entity> = new Array();

    tryAdd(entity: Entity): void {
        let index = this.entities.findIndex(x => x.id === entity.id);

        if (index === -1) {
            this.entities.push(entity);
        }
        else {
            throw "Entity already has component.";
        }
    }
}