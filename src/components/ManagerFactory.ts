import ColliderComponentManager from "./collider/ColliderComponentManager";
import ComponentManager from "./ComponentManager";

export default class ManagerFactory {
    private static managers: Map<string, ComponentManager> = new Map();

    constructor() {

    }

    public static register(componentName: string, manager: typeof ComponentManager): void {
        if (!ManagerFactory.managers.has(componentName)) {
            let managerInstance = new manager();
            ManagerFactory.managers.set(componentName, managerInstance);
        }
    }

    public static get(componentName: string): ComponentManager {
        if (ManagerFactory.managers.has(componentName)) {
            return ManagerFactory.managers.get(componentName);
        }

        throw "Manager has not been registered";
    }
    
    public static log(): void {
        ManagerFactory.managers.forEach((manager) => console.log(manager));
    }
}