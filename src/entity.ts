import ComponentManager from "./components/ComponentManager";
import Transform from "./primitives/transform";

/**
 * Base object class used for sprites, colliders, primitives, etc. Contains
 * shared code common across most classes.
 * 
 * @author NSSure
 * @since 11/8/2020
 */
export default class Entity {
    /**
     * Generates a unique 12 character ID for each entity.
     */
    // id: string = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 12);
    id: number = 0; // Refactored to number for ECS.

    /**
     * Determines if the entity should be rendered.
     */
    isEnabled: boolean = true;

    /**
     * Contains the position data for the entity. Includes the x and y coordinates as
     * well as the width and height of the entity.
     */
    transform: Transform = new Transform(0, 0, 0, 0);

    public addComponent<TComponent>(component: TComponent, componentManager: typeof ComponentManager): void {
        componentManager.getInstance().tryAdd(this);
    }

    public getComponent<TComponent>(): TComponent {
        return null;
    }
}