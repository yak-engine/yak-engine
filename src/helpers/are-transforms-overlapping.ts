import Point from "../primitives/Point";
import Transform from "../primitives/transform";
import isCoordinateContained from "./is-coordinate-contained";

export default function areTransformsOverlapping(targetTransform: Transform, containerTransform: Transform): boolean {
    if (containerTransform.x > targetTransform.x + targetTransform.width) {
        return false;
    }

    if (targetTransform.x > containerTransform.x + containerTransform.width) {
        return false;
    }

    if (containerTransform.y > targetTransform.y + targetTransform.height) {
        return false;
    }

    if (targetTransform.y > containerTransform.y + containerTransform.height) {
        return false;
    }

    return true;

    // if (isCoordinateContained(new Point(targetTransform.x, targetTransform.y), containerTransform)) {
    //     return true;
    // }

    // if (isCoordinateContained(new Point(targetTransform.x + targetTransform.width, targetTransform.y), containerTransform)) {
    //     return true;
    // }

    // if (isCoordinateContained(new Point(targetTransform.x, targetTransform.y + targetTransform.height), containerTransform)) {
    //     return true;
    // }

    // if (isCoordinateContained(new Point(targetTransform.x + targetTransform.width, targetTransform.y + targetTransform.height), containerTransform)) {
    //     return true;
    // }

    // return false;
}