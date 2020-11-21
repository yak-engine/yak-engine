import Application from "./src/application";
import ColliderComponent from "./src/components/collider/ColliderComponent";
import ColliderComponentManager from "./src/components/collider/ColliderComponentManager";
import EntityManager from "./src/components/EntityManager";
import ManagerFactory from "./src/components/ManagerFactory";
import TransformComponent from "./src/components/transform/TransformComponent";
import Entity from "./src/entity";
import Input from "./src/graphics/input";
import { Logger } from "./src/logging/logger";
import Transform from "./src/primitives/transform";
import Time from "./src/time";

export default class Demo extends Application {
    public testSpeed: number = 400;
    
    public player: Transform;

    constructor() {
        super();

        ManagerFactory.register(ColliderComponent.name, ColliderComponentManager);

        this.start();
    }

    ready(): void {
        let playerEntity: Entity = EntityManager.getInstance().create();

        this.player = new Transform(this.renderer.getCanvasWidth() / 2, this.renderer.getCanvasHeight() / 2, 32, 32);
        this.player.fillStyle = 'white';
        this.renderer.fragments.transformFragments.push(this.player);

        playerEntity.addComponent<ColliderComponent>(new ColliderComponent(this.player));

        Logger.data(playerEntity);

        // Seed demo enemies
        for (let i = 0; i < 5; i++) {
            let enemyEntity: Entity = EntityManager.getInstance().create();

            let transform: Transform = Transform.empty;
            transform.x = Math.floor(Math.random() * this.renderer.getCanvasWidth());
            transform.y = Math.floor(Math.random() * this.renderer.getCanvasHeight());
            transform.width = 32;
            transform.height = 32;
            transform.fillStyle = '#DB4F42';

            enemyEntity.addComponent<ColliderComponent>(new ColliderComponent(transform));

            Logger.data(enemyEntity.getComponent(ColliderComponent.name));

            this.renderer.fragments.transformFragments.push(transform);
        }

        for (let i = 0; i < 5; i++) {
            let coinEntity: Entity = EntityManager.getInstance().create();

            let transform: Transform = Transform.empty;
            transform.x = Math.floor(Math.random() * this.renderer.getCanvasWidth());
            transform.y = Math.floor(Math.random() * this.renderer.getCanvasHeight());
            transform.width = 32;
            transform.height = 32;
            transform.fillStyle = '#FFCD43';

            coinEntity.addComponent<ColliderComponent>(new ColliderComponent(transform, true));

            Logger.data(coinEntity.getComponent(ColliderComponent.name));

            this.renderer.fragments.transformFragments.push(transform);
        }

        this.exitEntity = EntityManager.getInstance().create();

        let transform: Transform = (<TransformComponent>this.exitEntity.getComponent(TransformComponent.name)).transform;
        transform.x = Math.floor(Math.random() * this.renderer.getCanvasWidth());
        transform.y = Math.floor(Math.random() * this.renderer.getCanvasHeight());
        transform.width = 32;
        transform.height = 32;
        transform.fillStyle = 'blue';

        this.exitEntity.addComponent<ColliderComponent>(new ColliderComponent(transform, true));

        this.renderer.fragments.transformFragments.push(transform);
    }

    exitEntity: Entity;

    update(deltaTime: number): void {
        this.renderer.context.fillStyle = 'red';
        this.renderer.context.fillRect(this.player.x, this.player.y, 32, 32);

        let horizontal = Input.horizontal();
        let vertical = Input.vertical();

        if (horizontal !== 0) {
            let movementX = horizontal * this.testSpeed;
            this.player.x += movementX;

            if (this.renderer.mainCamera.viewport.x > (this.renderer.mainCamera.viewport.width - 100)) {
                this.player.clampX(0, this.renderer.mainCamera.viewport.width - this.renderer.scene.spriteSize);
            }
            else {
                this.player.clampX(0, this.renderer.mainCamera.viewport.width - 100);
            }
        }

        if (vertical !== 0) {
            let movementY = vertical * this.testSpeed;
            this.player.y += movementY;
            this.player.y = Math.max(0, Math.min(this.player.y, this.renderer.scene.rows * this.renderer.scene.spriteSize - 32));

            if (this.renderer.mainCamera.viewport.y > (this.renderer.mainCamera.viewport.height - 100)) {
                this.player.clampY(0, this.renderer.mainCamera.viewport.height - this.renderer.scene.spriteSize);
            }
            else {
                this.player.clampY(0, this.renderer.mainCamera.viewport.height - 100);
            }
        }

        if (this.player.x >= this.renderer.mainCamera.viewport.width - 100 || this.player.x < 100) {
            this.renderer.mainCamera.viewport.x += horizontal * this.testSpeed;
            this.renderer.mainCamera.viewport.x = Math.max(0, Math.min(this.renderer.mainCamera.viewport.x, this.renderer.mainCamera.max.x));
        }

        if (this.player.y >= this.renderer.mainCamera.viewport.height - 100 || this.player.y <= 100) {
            this.renderer.mainCamera.viewport.y += vertical * this.testSpeed;
            this.renderer.mainCamera.viewport.y = Math.max(0, Math.min(this.renderer.mainCamera.viewport.y, this.renderer.mainCamera.max.y));
        }

        // Sample motion.
        let transform = (<TransformComponent>this.exitEntity.getComponent(TransformComponent.name)).transform;

        console.log(transform);

        transform.x += Time.deltaTime * 500;
        transform.clampX(0, this.renderer.getCanvasWidth() - 200);

        var newX = 100 * Math.cos(this.angle * (Math.PI / 180));
        var newY = 100 * Math.sin(this.angle * (Math.PI / 180));

        transform.x = newX + 200;
        transform.y = newY + 200;

        this.angle += 1;
    }

    angle: number = 0;
}

let demo = new Demo();