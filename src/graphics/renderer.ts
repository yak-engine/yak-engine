import pointWorldPosition from "../helpers/current-viewport-grid-square";
import Point from "../primitives/Point";
import Transform from "../primitives/transform";
import UIFragmentsRenderer from "../ui/ui-fragments-renderer";
import Fragments from "./fragments";
import Layer from "./layer";
import Tileset from "./tileset";
import Configuration from "../configuration";
import Scene from "./scene";
import Camera from "./camera";
import Input from "./input";
import isTransformEmpty from "../helpers/is-transform-empty";

export default class Renderer {
    /**
     * The canvas located within the default index.html document.
     */
    public engineCanvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector('#engine-canvas');

    /**
     * The 2D rendering context for the default canvas.
     */
    public context: CanvasRenderingContext2D = <CanvasRenderingContext2D>this.engineCanvas.getContext('2d');

    /**
     * The renderer that handle drawing the UI fragments to the given canvas context.
     */
    public uiFragmentsRender: UIFragmentsRenderer = new UIFragmentsRenderer(this);

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

    /**
     * The current scene being rendered.
     */
    public scene: Scene;

    /**
     * The tilesets being used for the current scene. Get loaded on startup.
     */
    public tilesets: Array<Tileset> = new Array();

    /**
     * The main scene camera this is always here.
     */
    public mainCamera: Camera = new Camera();

    /**
     * Main input tracking class.
     */
    public input: Input = new Input();

    /**
     * Default constructor. Queries the canvas together with the canvas context
     * and bootstraps the canvas events.
     */
    constructor() {
        // Ensure we resize the canvas here.
        this.resizeCanvas();

        this.engineCanvas.addEventListener('mousedown', (event) => this.onCanvasMouseDown(event));
        this.engineCanvas.addEventListener('mouseup', (event) => this.onCanvasMouseUp(event));
        this.engineCanvas.addEventListener('mousemove', (event) => this.onCanvasMouseMove(event));
    }

    init() {
        this.mainCamera.viewport = new Transform(0, 0, this.getCanvasWidth(), this.getCanvasHeight());
        this.mainCamera.max = new Point((this.scene.columns * this.scene.spriteSize) - this.mainCamera.viewport.width, (this.scene.rows * this.scene.spriteSize) - this.mainCamera.viewport.height);

        console.log(this.mainCamera.max);
    }

    draw() {
        this.clearCanvas();
        this.fillCanvas();
        this.drawLayers();
        this.drawPrimitives();
        
        this.uiFragmentsRender.run();

        this.resizeCanvas();
    }

    drawLayers(): void {
        this.scene.layers.forEach((layer: Layer) => {
            if (layer.enabled) {
                let camera = this.mainCamera;
    
                var startCol = Math.floor(camera.viewport.x / this.scene.spriteSize);
                var endCol = startCol + (camera.viewport.width / this.scene.spriteSize) + 1;
                var startRow = Math.floor(camera.viewport.y / this.scene.spriteSize);
                var endRow = startRow + (camera.viewport.height / this.scene.spriteSize) + 1;
                var offsetX = -camera.viewport.x + startCol * this.scene.spriteSize;
                var offsetY = -camera.viewport.y + startRow * this.scene.spriteSize;
    
                for (let col = startCol; col <= endCol; col++) {
                    for (let row = startRow; row <= endRow; row++) {
                        let sprite: number = layer.sprites[row * this.scene.columns + col];
    
                        var x = (col - startCol) * this.scene.spriteSize + offsetX;
                        var y = (row - startRow) * this.scene.spriteSize + offsetY;
    
                        this.context.drawImage(
                            this.tilesets[layer.tileset].image,
                            sprite * this.scene.spriteSize,
                            0,
                            this.scene.spriteSize,
                            this.scene.spriteSize,
                            Math.round(x),
                            Math.round(y),
                            this.scene.spriteSize,
                            this.scene.spriteSize
                        );
                    }
                }
            }
        });
    }

    drawPrimitives(): void {
        this.fragments.transformFragments.forEach((transform: Transform) => {
            this.context.fillStyle = transform.fillStyle;
            this.context.fillRect(transform.x, transform.y, transform.width, transform.height);
        });
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

    /**
     * Adds a default back fill to the canvas.
     */
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

    /**
     * Gets the current width of the canvas.
     */
    getCanvasHeight(): number {
        return this.engineCanvas.height;
    }

    /**
     * Gets the current height of the canvas.
     */
    getCanvasWidth(): number {
        return this.engineCanvas.width;
    }

    /**
     * Sets the height of the canvas.
     * @param height The height to set the canvas to.
     */
    setCanvasHeight(height: number): void {
        this.engineCanvas.height = height;
    }

    /**
     * Sets the width of the canvas.
     * @param width The width to set the canvas to.
     */
    setCanvasWidth(width: number): void {
        this.engineCanvas.width = width;
    }

    onCanvasMouseDown(event: MouseEvent): void {
        if (event.button === 0) {
            this.isMouseDown = true;
            this.uiFragmentsRender.isHoveredFragmentClicked(this.mousePosition);
        }
    }

    onCanvasMouseUp(event: MouseEvent): void {
        this.isMouseDown = false;
    }

    onCanvasMouseMove(event: MouseEvent): void {
        this.mousePosition = new Point(event.offsetX, event.offsetY);
        this.gridCoordinates = pointWorldPosition(this.mousePosition);

        if (isTransformEmpty(this.selectionTransform)) {
            this.selectionTransform = new Transform(this.gridCoordinates.x * Configuration.gridSquareSize, this.gridCoordinates.y * Configuration.gridSquareSize, 0, 0);
        }
        else {
            this.selectionTransform.width = ((this.gridCoordinates.x * Configuration.gridSquareSize) - this.selectionTransform.x) + Configuration.gridSquareSize;
            this.selectionTransform.height = ((this.gridCoordinates.y * Configuration.gridSquareSize) - this.selectionTransform.y) + Configuration.gridSquareSize;
        }
    }
}