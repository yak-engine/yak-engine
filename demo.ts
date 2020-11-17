import Application from "./src/application";

export default class Demo extends Application {
    constructor() {
        super();
        this.start();
    }
}

let demo = new Demo();