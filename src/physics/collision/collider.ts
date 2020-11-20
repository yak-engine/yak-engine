import Entity from "../../entity";

export default abstract class Collider extends Entity {
    isTrigger: boolean = false;
    isTriggered: boolean = false;

    abstract onCollisionEnter(): void;
    abstract onCollisionLeave(): void;
}