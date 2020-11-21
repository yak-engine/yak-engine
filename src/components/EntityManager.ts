import Entity from "../entity";
import ComponentManager from "./ComponentManager";

export default class EntityManager {
    private static instance: EntityManager;

    public static getInstance(): EntityManager {
        if (!EntityManager.instance) {
            EntityManager.instance = new EntityManager();
        }

        return EntityManager.instance;
    }

    public entities: Set<Entity>;

    public create(): Entity {
        let entity: Entity = new Entity();
        entity.id = this.entities.size;
        this.entities.add(entity);
        return entity;
    }

    public destroy(entity: Entity): void {
        this.entities.delete(entity);
    }
}