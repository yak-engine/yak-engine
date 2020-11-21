import Entity from "../entity";
import Transform from "../primitives/transform";
import TransformComponent from "./transform/TransformComponent";

export default class EntityManager {
    private static instance: EntityManager;

    public static getInstance(): EntityManager {
        if (!EntityManager.instance) {
            EntityManager.instance = new EntityManager();
        }

        return EntityManager.instance;
    }

    public entities: Set<Entity> = new Set();

    public create(): Entity {
        let entity: Entity = new Entity();
        entity.id = this.entities.size;
        this.entities.add(entity);

        this.addRequiredComponents(entity);

        return entity;
    }

    public destroy(entity: Entity): void {
        this.entities.delete(entity);
    }

    private addRequiredComponents(entity: Entity): void {
        entity.addComponent<TransformComponent>(new TransformComponent(Transform.empty));
    }
}