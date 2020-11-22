import Scaffold from './scaffold';
import Renderer from './graphics/renderer';
import Time from './time';
import SceneManager from './scene-manager';
import { Logger } from './logging/logger';
import Tileset from './graphics/tileset';
import Input from './graphics/input';
import areTransformsOverlapping from './helpers/are-transforms-overlapping';
import ColliderComponent from './components/collider/ColliderComponent';
import ManagerFactory from './components/ManagerFactory';
import TransformComponent from './components/transform/TransformComponent';
import TransformComponentManager from './components/transform/TransformComponentManager';
import MaterialComponentManager from './components/MaterialComponentManager';
import SpriteRendererComponent from './components/sprite-renderer/SpriteRendererComponent';
import SpriteRendererComponentManager from './components/sprite-renderer/SpriteRendererComponentManager';
import MaterialComponent from './components/material/MaterialComponent';
import TileMapComponent from './components/tile-map/TileMapComponent';
import TileMapComponentManager from './components/tile-map/TileMapComponentManager';
import ColliderComponentManager from './components/collider/ColliderComponentManager';

export default abstract class Application {
    /**
     * Contains basic configurable fields that are set before the application begins.
     */
    configuration: Scaffold = new Scaffold();

    /**
     * Contains the rendering functionality from the main loop.
     */
    renderer: Renderer = new Renderer();

    input: Input;

    scaffold: Scaffold;

    constructor() {
        // Register required component.
        ManagerFactory.register(TransformComponent.name, TransformComponentManager);
        ManagerFactory.register(MaterialComponent.name, MaterialComponentManager);
        ManagerFactory.register(SpriteRendererComponent.name, SpriteRendererComponentManager);
        ManagerFactory.register(TileMapComponent.name, TileMapComponentManager);
        ManagerFactory.register(ColliderComponent.name, ColliderComponentManager);
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

        // TODO: Replace this with a more robust collision dection implementation. For now this is fine for the number of sprites we are rendering with colliders.
        ManagerFactory.get(ColliderComponent.name).data.forEach((colliderComponent: ColliderComponent, colliderIndex: number) => {
            ManagerFactory.get(ColliderComponent.name).data.forEach((targetCollider: ColliderComponent, targetIndex: number) => {
                if (colliderIndex !== targetIndex) {
                    if (areTransformsOverlapping(colliderComponent.transform, targetCollider.transform)) {
                        console.log('collider hit');
                    }
                }
            })
        });

        // The main render call.
        this.renderer.draw();
    }

    abstract ready(): void;
    abstract update(deltaTime: number): void;
}