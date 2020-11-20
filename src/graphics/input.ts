import Time from "../time";

export default class Input {
    public static keys: Map<string, boolean> = new Map();

    constructor() {
        window.addEventListener('keydown', (event) => this.onKeyDown(event));
        window.addEventListener('keyup', (event) => this.onKeyUp(event));
    }

    onKeyDown(event: KeyboardEvent): void {
        Input.keys.set(event.key, true);
    }

    onKeyUp(event: KeyboardEvent): void {
        if (Input.keys.has(event.key)) {
            Input.keys.set(event.key, false);
        }
    }

    static isPressed(key: string): boolean {
        if (!Input.keys.has(key)) {
            return false;
        }

        return Input.keys.get(key);
    }

    static horizontal(): number {
        let xDirection;

        if (Input.isPressed('a'))
        {
            xDirection = -1;
        }
        else if (Input.isPressed('d'))
        {
            xDirection = 1;
        }
        else {
            xDirection = 0;
        }

        return xDirection * Time.deltaTime;
    }

    static vertical(): number {
        let yDirection;

        if (Input.isPressed('w'))
        {
            yDirection = -1;
        }
        else if (Input.isPressed('s'))
        {
            yDirection = 1;
        }
        else {
            yDirection = 0;
        }

        return yDirection * Time.deltaTime;
    }
}