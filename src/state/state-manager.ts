export default class StateManager {
    public static data: Map<string, any> = new Map<string, any>();

    public static commit<TType>(key: string, value: TType) {
        StateManager.data.set(key, value);
    }

    public static get<TType>(key: string) {
        if (StateManager.data.has(key)) {
            return <TType>StateManager.data.get(key);
        }

        return null;
    }

    public static exists(key: string): boolean {
        return StateManager.data.has(key);
    }

    public static delete(key: string): void {
        if (StateManager.data.has(key)) {
            StateManager.data.delete(key)
        }
    }
}