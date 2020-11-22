import Component from "../Component";

export default class MaterialComponent extends Component {
    fillStyle: string;
    alpha: number;

    constructor(fillStyle?: string, alpha?: number) {
        super();
        
        this.fillStyle = fillStyle;
        this.alpha = alpha;
    }
}