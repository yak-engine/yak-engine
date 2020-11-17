import Scaffold from "../scaffold";
import currentViewportGridCoordinates from "../helpers/current-viewport-grid-square";
import isTransformEmpty from "../helpers/is-transform-empty";
import { Logger } from "../logging/logger";
import Point from "../primitives/Point";
import Transform from "../primitives/transform";
import StateManager from "../state/state-manager";
import UIFragmentsRenderer from "../ui/ui-fragments-renderer";
import Fragments from "./fragments";
import Layer from "./layer";
import Sprite from "./sprite";
import SpriteRenderer from "./sprite-renderer";
import Tileset from "./tileset";
import Configuration from "../configuration";
import Scene from "./scene";
import Camera from "./camera";
import Input from "./input";

export default class Graphics {
    /**
     * The canvas located within the default index.html document.
     */
    public engineCanvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector('#engine-canvas');

    /**
     * The 2D rendering context for the default canvas.
     */
    public context: CanvasRenderingContext2D = <CanvasRenderingContext2D>this.engineCanvas.getContext('2d');

    /**
     * 
     */
    public layers: Array<Layer> = new Array();

    /**
     * The renderer that handle drawing the UI fragments to the given canvas context.
     */
    public uiFragmentsRender: UIFragmentsRenderer = new UIFragmentsRenderer(this);

    /**
     * 
     */
    public spriteRenderer: SpriteRenderer = new SpriteRenderer(this);

    /**
     * 
     */
    public fragments: Fragments = new Fragments();

    /**
     * The current position of the mouse in relation to the canvas. NOT the document.
     */
    public mousePosition: Point = new Point(0, 0);

    /**
     * The last position of the mouse within the canvas. 
     */
    public lastMousePosition: Point = new Point(0, 0);

    /**
     * The last grid position of the mouse within the canvas.
     */
    public gridCoordinates: Point;

    /**
     * Flag to determine if the mouse is down (specifcally left mouse clicks).
     */
    public isMouseDown: boolean = false;

    /**
     * Flag to determine if the canvas has selection mode enabled.
     */
    public isSelectionMode: boolean = false;

    /**
     * The transform of the current selection. If selection mode is off this
     * will be an empty transform.
     */
    public selectionTransform: Transform = new Transform(0, 0, 0, 0);

    public scene: Scene;

    public tilesets: Array<Tileset> = new Array();

    public camera: Camera = new Camera();

    public input: Input = new Input();

    /**
     * Default constructor. Queries the canvas together with the canvas context
     * and bootstraps the canvas events.
     */
    constructor() {
        this.camera.viewport = new Transform(0, 0, 512, 512);
        this.camera.max = new Point(64 * 32 - 512, 64 * 32 - 512);

        // Ensure we resize the canvas here.
        this.resizeCanvas();

        this.engineCanvas.addEventListener('mousedown', (event) => this.onCanvasMouseDown(event));
        this.engineCanvas.addEventListener('mouseup', (event) => this.onCanvasMouseUp(event));
        this.engineCanvas.addEventListener('mousemove', (event) => this.onCanvasMouseMove(event));
    }

    /**
     * The main draw method called from within the gameLoop function located in the Game.ts class.
     * This handles resizing the canvas and rendering primitives, sprites, and shapes to the canvas.
     * 
     * @author NSSure
     * @since 11/8/2020
     */
    draw(deltaTime: number) {
        if (this.isMouseDown) {
            // move camera
            this.camera.viewport.x += 1 * 256 * deltaTime;
            this.camera.viewport.y += 1 * 256 * deltaTime;

            // clamp values
            this.camera.viewport.x = Math.max(0, Math.min(this.camera.viewport.x, this.camera.max.x));
            this.camera.viewport.y = Math.max(0, Math.min(this.camera.viewport.y, this.camera.max.y));

            Logger.data(deltaTime);
        }
    }

    render() {
        this.clearCanvas();
        this.fillCanvas();

        this.spriteRenderer.run();
        this.uiFragmentsRender.run();

        this.resizeCanvas();
    }

    /**
     * Clears the canvas for the next draw call.
     * 
     * @author NSSure
     * @since 11/8/2020
     */
    clearCanvas(): void {
        this.context.clearRect(0, 0, this.getCanvasWidth(), this.getCanvasHeight());
    }

    fillCanvas(): void {
        this.context.fillStyle = Configuration.canvasFill;
        this.context.fillRect(0, 0, this.getCanvasWidth(), this.getCanvasHeight());
    }

    /**
     * Resizes the canvas canvas to fit the dimensions of the viewport.
     * 
     * @author NSSure
     * @since 11/8/2020
     */
    resizeCanvas(): void {
        if (this.getCanvasWidth() !== window.innerWidth || this.getCanvasHeight() !== window.innerHeight) {
            this.setCanvasWidth(window.innerWidth);
            this.setCanvasHeight(window.innerHeight);
        }
    }

    getCanvasHeight(): number {
        return this.engineCanvas.height;
    }

    getCanvasWidth(): number {
        return this.engineCanvas.width;
    }

    setCanvasHeight(height: number): void {
        this.engineCanvas.height = height;
    }

    setCanvasWidth(width: number): void {
        this.engineCanvas.width = width;
    }

    toggleSelectionMode(state: boolean): void {
        this.isSelectionMode = state;
        this.selectionTransform = Transform.empty;
    }

    onCanvasMouseDown(event: MouseEvent): void {
        if (event.button === 0) {
            this.isMouseDown = true;
            this.uiFragmentsRender.isHoveredFragmentClicked(this.mousePosition);
        }
    }

    onCanvasMouseUp(event: MouseEvent): void {
        if (!isTransformEmpty(this.selectionTransform)) {
            let spriteTemplate = StateManager.get<any>('pending-sprite-image')

            // If there is a pending sprite auto fill the selection.
            if (spriteTemplate) {
                let rows = this.selectionTransform.height / Configuration.gridSquareSize;
                let columns = this.selectionTransform.width / Configuration.gridSquareSize;

                for (let row = 0; row < rows; row++) {
                    for (let column = 0; column < columns; column++) {
                        let spriteInstance = new Sprite();

                        spriteInstance.transform.x = (column * Configuration.gridSquareSize) + this.selectionTransform.x;
                        spriteInstance.transform.y = (row * Configuration.gridSquareSize) + this.selectionTransform.y;
                        spriteInstance.transform.width = Configuration.gridSquareSize;
                        spriteInstance.transform.height = Configuration.gridSquareSize;
                        // spriteInstance.tilesetTransform = spriteTemplate.tilesetTransform;

                        this.fragments.spriteFragments.push(spriteInstance);
                    }
                }

                Logger.data(this.fragments.spriteFragments);
            }
            else {
                Logger.info('we hit on mouse up with a non empty transform');
                Logger.data(this.selectionTransform);

                if (this.isSelectionMode) {
                    // this.openContextMenu(new Point(this.mousePosition.x, this.mousePosition.y));
                }
            }
        }

        this.isMouseDown = false;
    }

    onCanvasMouseMove(event: MouseEvent): void {
        this.mousePosition = new Point(event.offsetX, event.offsetY);
        this.gridCoordinates = currentViewportGridCoordinates(this.mousePosition);

        if (isTransformEmpty(this.selectionTransform)) {
            this.selectionTransform = new Transform(this.gridCoordinates.x * Configuration.gridSquareSize, this.gridCoordinates.y * Configuration.gridSquareSize, 0, 0);
        }
        else {
            this.selectionTransform.width = ((this.gridCoordinates.x * Configuration.gridSquareSize) - this.selectionTransform.x) + Configuration.gridSquareSize;
            this.selectionTransform.height = ((this.gridCoordinates.y * Configuration.gridSquareSize) - this.selectionTransform.y) + Configuration.gridSquareSize;
        }
    }
}