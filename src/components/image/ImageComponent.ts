import Component from "../Component";

export default class ImageComponent extends Component {
    source: string;

    constructor(source?: string) {
        super();
        this.source = source;
    }
}