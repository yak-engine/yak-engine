import Application from "./src/application";
import ColliderComponent from "./src/components/collider/ColliderComponent";
import ColliderComponentManager from "./src/components/collider/ColliderComponentManager";
import EntityManager from "./src/components/EntityManager";
import MaterialComponent from "./src/components/MaterialComponent";
import MaterialComponentManager from "./src/components/MaterialComponentManager";
import Entity from "./src/entity";
import Input from "./src/graphics/input";
import Transform from "./src/primitives/transform";

export default class Demo extends Application {
    public testSpeed: number = 400;
    
    public player: Transform;

    constructor() {
        super();
        this.start();
    }

    ready(): void {
        let playerEntity: Entity = EntityManager.getInstance().create();

        this.player = new Transform(this.renderer.getCanvasWidth() / 2, this.renderer.getCanvasHeight() / 2, 32, 32);
        this.player.fillStyle = 'white';
        this.renderer.fragments.transformFragments.push(this.player);

        playerEntity.addComponent<MaterialComponent>(new MaterialComponent('yellow'), MaterialComponentManager);
        playerEntity.addComponent<ColliderComponent>(new ColliderComponent(this.player), ColliderComponentManager);

        // Seed demo enemies
        for (let i = 0; i < 5; i++) {
            let transform: Transform = Transform.empty;

            transform.x = Math.floor(Math.random() * this.renderer.getCanvasWidth());
            transform.y = Math.floor(Math.random() * this.renderer.getCanvasHeight());
            transform.width = 32;
            transform.height = 32;
            transform.fillStyle = '#DB4F42';

            this.renderer.fragments.transformFragments.push(transform);
        }
    }

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
    }
}

let demo = new Demo();