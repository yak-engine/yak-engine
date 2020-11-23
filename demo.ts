import Application from "./src/application";
import ColliderComponent from "./src/components/collider/ColliderComponent";
import ColliderComponentManager from "./src/components/collider/ColliderComponentManager";
import EntityManager from "./src/components/EntityManager";
import ImageComponent from "./src/components/image/ImageComponent";
import ImageComponentManager from "./src/components/image/ImageComponentManager";
import ManagerFactory from "./src/components/ManagerFactory";
import MaterialComponent from "./src/components/material/MaterialComponent";
import SpriteRendererComponent from "./src/components/sprite-renderer/SpriteRendererComponent";
import SpriteRendererComponentManager from "./src/components/sprite-renderer/SpriteRendererComponentManager";
import TagComponent from "./src/components/tag/TagComponent";
import TileMapComponent from "./src/components/tilemap/TilemapComponent";
import TransformComponent from "./src/components/transform/TransformComponent";
import TransformComponentManager from "./src/components/transform/TransformComponentManager";
import Entity from "./src/entity";
import Input from "./src/graphics/input";
import { Logger } from "./src/logging/logger";
import Transform from "./src/primitives/transform";
import Time from "./src/time";

export default class Demo extends Application {
    public testSpeed: number = 400;
    
    // public playerEntity: Entity;
    public playerTransform: Transform;

    public length: number = 3840;
    public startPosition: number = 0;

    images: Array<HTMLImageElement> = new Array();

    loaded: boolean = false;

    constructor() {
        super();

        // const layerImages = ['/bundle/images/j1.png', '/bundle/images/j2.png', '/bundle/images/j3.png', '/bundle/images/j4.png'];

        // layerImages.map((url) => {
        //     let image = new Image();
            
        //     image.src = url; // `data:image/png;base64,${imagesAsBase64}`;

        //     image.onload = () => {
        //         this.loaded = true;
        //         this.images.push(image);
        //     }

        //     console.log(this.images);
        //     // document.body.appendChild(image);
        // });

        this.start();
    }

    private arrayBufferToBase64(buffer: any) {
        let binary = "";
        const bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b: any) => binary += String.fromCharCode(b));
        // Inside of a web tab
        return window.btoa(binary);
    }

    ready(): void {
        let image: Entity = EntityManager.getInstance().create();
        image.addComponent<ImageComponent>(new ImageComponent('./bundle/images/j1.png'));

        // this.playerEntity = EntityManager.getInstance().create();

        this.renderer.playerEntity.getComponent<TagComponent>(TagComponent.name).name = 'player';

        // Transform is a required component for now.
        this.playerTransform = this.renderer.playerEntity.getComponent<TransformComponent>(TransformComponent.name).transform;

        this.playerTransform.x = this.renderer.getCanvasWidth() / 2;
        this.playerTransform.y = this.renderer.getCanvasHeight() / 2;
        this.playerTransform.width = 32;
        this.playerTransform.height = 32;

        this.renderer.playerEntity.addComponent<SpriteRendererComponent>(new SpriteRendererComponent(this.playerTransform, 0, 0, 128, 5));
        this.renderer.playerEntity.addComponent<ColliderComponent>(new ColliderComponent(this.playerTransform));
        this.renderer.playerEntity.addComponent<MaterialComponent>(new MaterialComponent('transparent', 0.5));

        // Seed demo enemies
        for (let i = 0; i < 5; i++) {
            let enemyEntity: Entity = EntityManager.getInstance().create();

            let enemyTransform = enemyEntity.getComponent<TransformComponent>(TransformComponent.name).transform;
            enemyTransform.x = Math.floor(Math.random() * this.renderer.getCanvasWidth());
            enemyTransform.y = Math.floor(Math.random() * this.renderer.getCanvasHeight());
            enemyTransform.width = 32;
            enemyTransform.height = 32;

            enemyEntity.addComponent<ColliderComponent>(new ColliderComponent(enemyTransform));
            enemyEntity.addComponent<SpriteRendererComponent>(new SpriteRendererComponent(enemyTransform, 0, 0, 131, 6));
            enemyEntity.addComponent<MaterialComponent>(new MaterialComponent('#FFCD43'));
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
            coinEntity.addComponent<MaterialComponent>(new MaterialComponent('#FFCD43'));
        }

        this.exitEntity = EntityManager.getInstance().create();

        let transform: Transform = (<TransformComponent>this.exitEntity.getComponent(TransformComponent.name)).transform;
        transform.x = Math.floor(Math.random() * this.renderer.getCanvasWidth());
        transform.y = Math.floor(Math.random() * this.renderer.getCanvasHeight());
        transform.width = 32;
        transform.height = 32;

        this.exitEntity.addComponent<ColliderComponent>(new ColliderComponent(transform, true));

        ManagerFactory.log();
    }

    exitEntity: Entity;

    paraSpeed = [
        1, 2, 3 , 4
    ]

    x: number = 0;

    update(deltaTime: number): void {
        // console.log(this.loaded);

        // if (this.loaded) {
        //     this.images.slice().reverse().forEach((image, index) => {
        //         // let temp = (this.renderer.mainCamera.viewport.x * (1 - this.paraSpeed[index])) * Time.deltaTime;
        //         // let dist = (this.renderer.mainCamera.viewport.x * this.paraSpeed[index]) * Time.deltaTime;

        //         // let x = this.startPosition + dist;
        //         // let y = 0;

        //         // if (temp > this.startPosition + this.length) {
        //         //     this.startPosition += this.length;
        //         // }
        //         // else if (temp < this.startPosition - this.length) {
        //         //     this.startPosition -= this.length;
        //         // }

        //         // this.renderer.mainCamera.viewport.x = x;

        //         // console.log(x);

        //         // this.x += Time.deltaTime;

        //         // this.renderer.context.drawImage(image, 0, image.height / 3 - (this.renderer.getCanvasHeight() / 6));
        //     })
        // }
        

        // return;

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

        // Sample motion.
        let transform = (<TransformComponent>this.exitEntity.getComponent(TransformComponent.name)).transform;

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