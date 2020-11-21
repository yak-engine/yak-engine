import Scaffold from './scaffold';
import Renderer from './graphics/renderer';
import Time from './time';
import SceneManager from './scene-manager';
import { Logger } from './logging/logger';
import Tileset from './graphics/tileset';
import Input from './graphics/input';
import Physics from './physics/physics';
import Collider from './physics/collision/collider';
import worldToScreen from './helpers/world-to-screen';
import areTransformsOverlapping from './helpers/are-transforms-overlapping';
import Transform from './primitives/transform';
import ColliderComponentManager from './components/collider/ColliderComponentManager';
import ColliderComponent from './components/collider/ColliderComponent';

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


        (<ColliderComponentManager>ColliderComponentManager.getInstance()).colliders.forEach((collider: ColliderComponent, index: number) => {
            // if (areTransformsOverlapping(collider.transform, )) {

            // }
        })

        // Physics.colliders.forEach((collider: Collider) => {
        //     let worldCoords = worldToScreen(this.renderer.mainCamera, collider.transform.x, collider.transform.y);
        //     this.renderer.context.strokeRect(worldCoords.x, worldCoords.y, collider.transform.width, collider.transform.height);

        //     if (areTransformsOverlapping(player transfrom, new Transform(worldCoords.x, worldCoords.y, 32, 32))) {
        //         collider.isTriggered = true;
        //         collider.onCollisionEnter();
        //     }
        //     else {
        //         if (collider.isTriggered) {
        //             collider.isTriggered = false;
        //             collider.onCollisionLeave();
        //         }
        //     }
        // })

        // The main render call.
        this.renderer.draw();
    }

    abstract ready(): void;
    abstract update(deltaTime: number): void;
}