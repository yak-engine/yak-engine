export default class Input {
    public keys: Map<string, boolean> = new Map();

    constructor() {
        window.addEventListener('keydown', (event) => this.onKeyDown(event));
        window.addEventListener('keyup', (event) => this.onKeyDown(event));
    }

    onKeyDown(event: KeyboardEvent): void {
        if (this.keys.has(event.key)) {
            this.keys.set(event.key, true);
        }
    }

    onKeyUp(event: KeyboardEvent): void {
        if (this.keys.has(event.key)) {
            this.keys.set(event.key, false);
        }
    }
}