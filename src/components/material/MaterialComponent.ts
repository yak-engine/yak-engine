import Component from "../Component";

export default class MaterialComponent extends Component {
    fillStyle: string;
    alpha: number = 1;

    constructor(fillStyle?: string, alpha?: number) {
        super();
        
        this.fillStyle = fillStyle;
        this.alpha = alpha;
    }
}