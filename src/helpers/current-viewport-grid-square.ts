import Point from "../primitives/Point";
import Configuration from "../configuration";

export default function currentViewportGridCoordinates(mousePosition: Point): Point {
    let gridCoordinates = new Point(0, 0);
    
    gridCoordinates.x = Math.floor(mousePosition.x / Configuration.gridSquareSize);
    gridCoordinates.y = Math.floor(mousePosition.y / Configuration.gridSquareSize);

    return gridCoordinates;
}