import Camera from "../graphics/camera";

export default function screenToWorld(camera: Camera, x: number, y: number) {
    return {x: x + camera.viewport.x, y: y + camera.viewport.y};
  }