import Component from "../Component";

export default class TagComponent extends Component {
    name: string;

    constructor(name?: string) {
        super();
        this.name = name;
    }
}