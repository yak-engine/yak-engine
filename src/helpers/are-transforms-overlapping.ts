import Transform from "../primitives/transform";

export default function areTransformsOverlapping(targetTransform: Transform, containerTransform: Transform): boolean {
    if (targetTransform.x >= containerTransform.x && (targetTransform.x <= (containerTransform.x + containerTransform.width))) {
        if (targetTransform.y >= containerTransform.y && (targetTransform.y <= (containerTransform.y + containerTransform.height))) {
            return true;
        }
    }

    if ((targetTransform.x + targetTransform.width) >= containerTransform.x && ((targetTransform.x + targetTransform.width)) <= (containerTransform.x + containerTransform.width)) {
        if ((targetTransform.y + targetTransform.height) >= containerTransform.y && ((targetTransform.y + targetTransform.height)) <= (containerTransform.y + containerTransform.height)) {
            return true;
        }
    }

    if ((targetTransform.y - targetTransform.height) <= containerTransform.y && ((targetTransform.y - targetTransform.height)) >= (containerTransform.y + containerTransform.height)) {
        return true;
    }
}