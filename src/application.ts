import Scaffold from './scaffold';
import Graphics from './graphics/graphics';
import Time from './time';
import SceneManager from './scene-manager';
import { Logger } from './logging/logger';
import Tileset from './graphics/tileset';
import Input from './graphics/input';

export default class Application {
    /**
     * Contains basic configurable fields that are set before the application begins.
     */
    configuration: Scaffold = new Scaffold();

    /**
     * Contains the rendering functionality from the main loop.
     */
    graphics: Graphics = new Graphics();

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
            this.graphics.scene = await SceneManager.load(scaffold.scenes[0]);

            Logger.data(this.graphics.scene);

            let loadedTilesets = 0;
            
            this.graphics.scene.tilesets.forEach((tilesetPath: string) => {
               let image = new Image();

               image.onload = () => {
                   this.graphics.tilesets.push(new Tileset(image));
                   
                   loadedTilesets++;

                    if (loadedTilesets === this.graphics.scene.tilesets.length) {
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

        Time.calculateDeltaTime(time);

        this.graphics.context.clearRect(0, 0, this.graphics.getCanvasWidth(), this.graphics.getCanvasHeight());
        
        this.graphics.render();
        this.graphics.update(Time.deltaTime);
    }
}