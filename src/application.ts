import Scaffold from './scaffold';
import Graphics from './graphics/graphics';
import Time from './time';
import Scene from './graphics/scene';
import SceneManager from './scene-manager';
import { Logger } from './logging/logger';
import Layer from './graphics/layer';
import Tileset from './graphics/tileset';

export default class Application {
    /**
     * Contains basic configurable fields that are set before the application begins.
     */
    configuration: Scaffold = new Scaffold();

    /**
     * Contains the rendering functionality from the main loop.
     */
    graphics: Graphics = new Graphics();

    scaffold: Scaffold;

    /**
     * Actually begins the game instance. Processes the configuration.
     * 
     * @author NSSure
     * @since 11/8/2020
     */
    start(): void {
        fetch('./scaffold.json').then((response) => response.json()).then(async (scaffold: Scaffold) => {
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
    mainLoop(elapsed: number) {
        window.requestAnimationFrame((elapsed: number) => this.mainLoop(elapsed));

        var delta = (elapsed - this._previousElapsed) / 1000.0;
        delta = Math.min(delta, 0.25); // maximum delta of 250 ms
        this._previousElapsed = elapsed;

        Time.calculateDeltaTime(this._previousElapsed);

        this.graphics.draw(delta);
        this.graphics.render();
    }

    _previousElapsed: number;
}