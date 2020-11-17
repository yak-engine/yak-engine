import Scene from "./graphics/scene";

export default class SceneManager {
    public static async load(sceneName: string): Promise<Scene> {
        return (<Scene>await (await fetch(`./bundle/scenes/${sceneName}.json`)).json());
    }
}