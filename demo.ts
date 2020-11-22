import Application from "./src/application";
import ColliderComponent from "./src/components/collider/ColliderComponent";
import ColliderComponentManager from "./src/components/collider/ColliderComponentManager";
import EntityManager from "./src/components/EntityManager";
import ManagerFactory from "./src/components/ManagerFactory";
import MaterialComponent from "./src/components/material/MaterialComponent";
import SpriteRendererComponent from "./src/components/sprite-renderer/SpriteRendererComponent";
import SpriteRendererComponentManager from "./src/components/sprite-renderer/SpriteRendererComponentManager";
import TagComponent from "./src/components/tag/TagComponent";
import TileMapComponent from "./src/components/tile-map/TileMapComponent";
import TransformComponent from "./src/components/transform/TransformComponent";
import TransformComponentManager from "./src/components/transform/TransformComponentManager";
import Entity from "./src/entity";
import Input from "./src/graphics/input";
import { Logger } from "./src/logging/logger";
import Transform from "./src/primitives/transform";
import Time from "./src/time";

export default class Demo extends Application {
    public testSpeed: number = 400;
    
    public playerEntity: Entity;
    public playerTransform: Transform;

    constructor() {
        super();



        this.start();
    }

    ready(): void {
        let tileMap: Entity = EntityManager.getInstance().create();
        tileMap.addComponent<TileMapComponent>(new TileMapComponent());

        console.log(tileMap);

        this.playerEntity = EntityManager.getInstance().create();

        this.playerEntity.getComponent<TagComponent>(TagComponent.name).name = 'player';

        // Transform is a required component for now.
        this.playerTransform = this.playerEntity.getComponent<TransformComponent>(TransformComponent.name).transform;

        console.log(this.playerTransform);

        this.playerTransform.x = this.renderer.getCanvasWidth() / 2;
        this.playerTransform.y = this.renderer.getCanvasHeight() / 2;
        this.playerTransform.width = 32;
        this.playerTransform.height = 32;

        console.log(this.playerEntity.getComponent<TransformComponent>(TransformComponent.name).transform);

        this.playerEntity.addComponent<SpriteRendererComponent>(new SpriteRendererComponent(this.playerTransform, 0, 0, 128, 5));
        this.playerEntity.addComponent<ColliderComponent>(new ColliderComponent(this.playerTransform));
        this.playerEntity.addComponent<MaterialComponent>(new MaterialComponent('transparent', 0.5));

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

            let coinTransform = coinEntity.getComponent<TransformComponent>(TransformComponent.name).transform;
            coinTransform.x = Math.floor(Math.random() * this.renderer.getCanvasWidth());
            coinTransform.y = Math.floor(Math.random() * this.renderer.getCanvasHeight());
            coinTransform.width = 32;
            coinTransform.height = 32;

            coinEntity.addComponent<ColliderComponent>(new ColliderComponent(coinTransform, true));
            coinEntity.addComponent<SpriteRendererComponent>(new SpriteRendererComponent(coinTransform, 0, 0, 107, 6));

            Logger.data(coinEntity.getComponent(ColliderComponent.name));

            // this.renderer.fragments.transformFragments.push(transform);
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

        let manager = <TransformComponentManager>ManagerFactory.get(TransformComponent.name);
        console.log(manager);

        let t = <SpriteRendererComponentManager>ManagerFactory.get(SpriteRendererComponent.name);
        console.log(t);
    }

    exitEntity: Entity;

    update(deltaTime: number): void {
        // this.renderer.context.fillStyle = 'red';
        // this.renderer.context.fillRect(this.player.x, this.player.y, 32, 32);

        // TODO: Add back with reference to player removed.
        let horizontal = Input.horizontal();
        let vertical = Input.vertical();

        if (horizontal !== 0) {
            let movementX = horizontal * this.testSpeed;
            this.playerTransform.x += movementX;

            if (this.renderer.mainCamera.viewport.x > (this.renderer.mainCamera.viewport.width - 100)) {
                this.playerTransform.clampX(0, this.renderer.mainCamera.viewport.width - this.renderer.scene.spriteSize);
            }
            else {
                this.playerTransform.clampX(0, this.renderer.mainCamera.viewport.width);
            }
        }

        if (vertical !== 0) {
            let movementY = vertical * this.testSpeed;
            this.playerTransform.y += movementY;
            this.playerTransform.y = Math.max(0, Math.min(this.playerTransform.y, this.renderer.scene.rows * this.renderer.scene.spriteSize - 32));

            if (this.renderer.mainCamera.viewport.y > (this.renderer.mainCamera.viewport.height - 100)) {
                this.playerTransform.clampY(0, this.renderer.mainCamera.viewport.height - this.renderer.scene.spriteSize);
            }
            else {
                this.playerTransform.clampY(0, this.renderer.mainCamera.viewport.height - 100);
            }
        }

        if (this.playerTransform.x >= this.renderer.mainCamera.viewport.width - 100 || this.playerTransform.x < 100) {
            this.renderer.mainCamera.viewport.x += horizontal * this.testSpeed;
            this.renderer.mainCamera.viewport.x = Math.max(0, Math.min(this.renderer.mainCamera.viewport.x, this.renderer.mainCamera.max.x));
        }

        if (this.playerTransform.y >= this.renderer.mainCamera.viewport.height - 100 || this.playerTransform.y <= 100) {
            this.renderer.mainCamera.viewport.y += vertical * this.testSpeed;
            this.renderer.mainCamera.viewport.y = Math.max(0, Math.min(this.renderer.mainCamera.viewport.y, this.renderer.mainCamera.max.y));
        }

        // console.log(this.playerTransform);

        // Sample motion.
        let transform = (<TransformComponent>this.exitEntity.getComponent(TransformComponent.name)).transform;

        // console.log(transform);

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