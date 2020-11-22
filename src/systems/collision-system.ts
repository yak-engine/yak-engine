import ColliderComponent from "../components/collider/ColliderComponent";
import ColliderComponentManager from "../components/collider/ColliderComponentManager";
import EntityManager from "../components/EntityManager";
import ManagerFactory from "../components/ManagerFactory";
import TagComponent from "../components/tag/TagComponent";
import TagComponentManager from "../components/tag/TagComponentManager";
import Entity from "../entity";
import areTransformsOverlapping from "../helpers/are-transforms-overlapping";

export default class CollisionSystem {
    constructor() {

    }

    run() {
        let collisionComponentManager: ColliderComponentManager = ManagerFactory.get(ColliderComponent.name);

        collisionComponentManager.data.forEach((colliderComponent: ColliderComponent) => {
            colliderComponent.isColliding = false;
        });

        for (let i = 0; i < collisionComponentManager.entities.length; i++) {
            let sourceCollider: ColliderComponent = collisionComponentManager.entities[i].getComponent<ColliderComponent>(ColliderComponent.name);

            for (let ii = i + 1; ii < collisionComponentManager.entities.length; ii++) {
                let targetCollider: ColliderComponent = collisionComponentManager.entities[ii].getComponent<ColliderComponent>(ColliderComponent.name);

                // if (sourceCollider.transform.x > targetCollider.transform.x + targetCollider.transform.width) {
                //     return false;
                // }
            
                // if (targetCollider.transform.y > sourceCollider.transform.y + sourceCollider.transform.height) {
                //     return false;
                // }
            
                // if (sourceCollider.transform.y > targetCollider.transform.y + targetCollider.transform.height) {
                //     return false;
                // }

                // if (areTransformsOverlapping(sourceCollider.transform, targetCollider.transform)) {
                    

                //     console.log(collisionComponentManager.entities[i].getComponent<TagComponent>(TagComponent.name).name);
                // }
            }    
        }

        // // TODO: Pass in only entities that actually have the collider component so we don't have to iterate all entities here.
        // EntityManager.getInstance().entities.forEach((entity: Entity) => {

        // });

        // // TODO: Replace this with a more robust collision dection implementation. For now this is fine for the number of sprites we are rendering with colliders.
        // ManagerFactory.get(ColliderComponent.name).data.forEach((colliderComponent: ColliderComponent, colliderIndex: number) => {
        //     ManagerFactory.get(ColliderComponent.name).data.forEach((targetCollider: ColliderComponent, targetIndex: number) => {
        //         if (colliderIndex !== targetIndex) {
        //             if (areTransformsOverlapping(colliderComponent.transform, targetCollider.transform)) {
        //                 colliderComponent.transform.clampY(targetCollider.transform.x, targetCollider.transform.x);
        //             }
        //         }
        //     })
        // });
    }
}