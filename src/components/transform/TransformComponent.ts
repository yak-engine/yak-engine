import Transform from "../../primitives/transform";
import Component from "../Component";

export default class TransformComponent extends Component {
    transform: Transform;

    constructor(transform?: Transform) {
        super();
        this.transform = transform;
    }
}