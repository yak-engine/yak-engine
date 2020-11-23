import Scaffold from './scaffold';
import Renderer from './graphics/renderer';
import Time from './time';
import SceneManager from './scene-manager';
import { Logger } from './logging/logger';
import Tileset from './graphics/tileset';
import Input from './graphics/input';
import ColliderComponent from './components/collider/ColliderComponent';
import ManagerFactory from './components/ManagerFactory';
import TransformComponent from './components/transform/TransformComponent';
import TransformComponentManager from './components/transform/TransformComponentManager';
import MaterialComponentManager from './components/MaterialComponentManager';
import SpriteRendererComponent from './components/sprite-renderer/SpriteRendererComponent';
import SpriteRendererComponentManager from './components/sprite-renderer/SpriteRendererComponentManager';
import MaterialComponent from './components/material/MaterialComponent';
import TileMapComponent from './components/tilemap/TilemapComponent';
import TileMapComponentManager from './components/tilemap/TilemapComponentManager';
import ColliderComponentManager from './components/collider/ColliderComponentManager';
import CollisionSystem from './systems/collision-system';
import TagComponent from './components/tag/TagComponent';
import TagComponentManager from './components/tag/TagComponentManager';
import ImageComponent from './components/image/ImageComponent';
import ImageComponentManager from './components/image/ImageComponentManager';
import TilemapComponent from './components/tilemap/TilemapComponent';

export default abstract class Application {
    /**
     * Contains basic configurable fields that are set before the application begins.
     */
    configuration: Scaffold = new Scaffold();

    /**
     * Contains the rendering functionality from the main loop.
     */
    renderer: Renderer = new Renderer();

    collision: CollisionSystem = new CollisionSystem();

    input: Input;

    scaffold: Scaffold;

    constructor() {
        // Register required component.
        // TODO: Only register the required components.
        ManagerFactory.register(TagComponent.name, TagComponentManager);
        ManagerFactory.register(TransformComponent.name, TransformComponentManager);
        ManagerFactory.register(MaterialComponent.name, MaterialComponentManager);
        ManagerFactory.register(SpriteRendererComponent.name, SpriteRendererComponentManager);
        ManagerFactory.register(TileMapComponent.name, TileMapComponentManager);
        ManagerFactory.register(ColliderComponent.name, ColliderComponentManager);
        ManagerFactory.register(ImageComponent.name, ImageComponentManager);
        ManagerFactory.register(TilemapComponent.name, TileMapComponentManager);
    }

    /**
     * Actually begins the game instance. Processes the configuration.
     * 
     * @author NSSure
     * @since 11/8/2020
     */
    start(): void {
        fetch('./bundle/scaffold.json').then((response) => response.json()).then(async (scaffold: Scaffold) => {
            this.renderer.scene = await SceneManager.load(scaffold.scenes[0]);

            let loadedTilesets = 0;

            this.renderer.scene.tilesets.forEach((tilesetPath: string) => {
               let image = new Image();

               image.onload = () => {
                   this.renderer.tilesets.push(new Tileset(image));
                   
                   loadedTilesets++;

                    if (loadedTilesets === this.renderer.scene.tilesets.length) {
                        this.renderer.init();
                        this.ready();
                        window.requestAnimationFrame((time: number) => this.mainLoop(time));
                    }
               }

               image.onerror = () => {
                   Logger.data('failed to load tileset');
               }
               
               image.src = tilesetPath;
            });
        })
    }

    /**
     * The main loop contains all the rendering logic will be called from within this function.
     * 
     * @param time The time between the animation frames.
     * 
     * @author NSSure
     * @since 11/8/2020
     */
    mainLoop(time: number) {
        window.requestAnimationFrame((time: number) => this.mainLoop(time));

        // Calculate delta time for update method.
        Time.calculateDeltaTime(time);

        // Call the update method. Implemented by the consuming class.
        this.update(Time.deltaTime);

        // Run the systems between the update and draw calls.
        this.collision.run();

        // The main render call.
        this.renderer.draw();
    }

    abstract ready(): void;
    abstract update(deltaTime: number): void;
}