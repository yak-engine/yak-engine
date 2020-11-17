import Configuration from "../configuration";
import { Logger } from "../logging/logger";
import Graphics from "./graphics";
import Layer from "./layer";
import Sprite from "./sprite";

export default class SpriteRenderer {
    graphics: Graphics;

    tileset = new Image();

    constructor(canvas: Graphics) {
        this.graphics = canvas;
    }

    run(): void {
        this.drawLayers();

        this.graphics.context.fillStyle = 'white';
        this.graphics.context.fillRect(0, 0, 32, 32);
    }

    drawLayers(): void {
        this.graphics.scene.layers.forEach((layer: Layer) => {
            if (layer.enabled) {
                let startColumn = Math.floor(this.graphics.camera.viewport.x / this.graphics.scene.spriteSize);
                let endColumn = startColumn + (this.graphics.camera.viewport.width / this.graphics.scene.spriteSize);

                let startRow = Math.floor(this.graphics.camera.viewport.y / this.graphics.scene.spriteSize);
                let endRow = startRow + (this.graphics.camera.viewport.height / this.graphics.scene.spriteSize);

                let offsetX = -this.graphics.camera.viewport.x + startColumn * this.graphics.scene.spriteSize;
                let offsetY = -this.graphics.camera.viewport.y + startRow * this.graphics.scene.spriteSize;

                for(var column = startColumn; column < endColumn; column++){ //this loops over the columns
                    for(var row = startRow; row < endRow; row++){ //this loops over the rows
                        let sprite: number = layer.sprites[row * this.graphics.scene.columns + column];

                        let x = (column - startColumn) * this.graphics.scene.spriteSize + offsetX;
                        let y = (row - startColumn) * this.graphics.scene.spriteSize + offsetY;
                        
                        this.graphics.context.drawImage(
                            this.graphics.tilesets[layer.tileset].image,
                            sprite * this.graphics.scene.spriteSize,
                            0,
                            this.graphics.scene.spriteSize,
                            this.graphics.scene.spriteSize,
                            Math.round(x),
                            Math.round(y),
                            this.graphics.scene.spriteSize,
                            this.graphics.scene.spriteSize
                        )
                    }
                }
            }
        });
    }
}