import { uiConstants } from "../constants";
import Renderer from "../graphics/renderer";
import isCoordinateContained from "../helpers/is-coordinate-contained";
import Point from "../primitives/Point";
import Button from "./button";
import UIFragment from "./ui-base";

export default class UIFragmentsRenderer {
    graphics: Renderer;

    constructor(canvas: Renderer) {
        this.graphics = canvas;
    }

    public run(): void {
        this.draw();
        this.processInteractables();
    }

    private draw(): void {
        this.graphics.fragments.uiFragments.forEach((uiFragment: UIFragment) => {
            if (uiFragment.isEnabled) {
                this.graphics.context.beginPath();

                if (uiFragment.isHovered && uiFragment.hoverState) {
                    this.graphics.context.fillStyle = <string>uiFragment.hoverState.backgroundColor;
                }
                else {
                    this.graphics.context.fillStyle = uiFragment.backgroundColor;
                }

                // this.graphics.context.fillRect(uiFragment.transform.x, uiFragment.transform.y, uiFragment.transform.width, uiFragment.transform.height);
                this.graphics.context.closePath(); 

                switch(uiFragment.constructor.name) {
                    case uiConstants.entityName.button:
                        this.graphics.context.font = '16px Arial';
                        this.graphics.context.fillStyle = 'white';
                        this.graphics.context.textAlign = 'center';
                        this.graphics.context.textBaseline = 'middle';
                        let x = 0; //uiFragment.transform.x + (uiFragment.transform.width / 2);
                        let y = 0; //uiFragment.transform.y + (uiFragment.transform.height / 2);
                        this.graphics.context.fillText((<Button>uiFragment).text, x, y);
                        break;
                    default:
                        break;
                }
            }
        });
    }

    private processInteractables(): void {
        this.graphics.fragments.uiFragments.forEach((uiFragment: UIFragment) => {
            // If the fragment is not interactive simply check the position check.
            // if (uiFragment.isInteractive) {
            //     if (isCoordinateContained(this.graphics.mousePosition, uiFragment.transform)) {
            //         uiFragment.isHovered = true;

            //         if (uiFragment.onHover) {
            //             uiFragment.onHover();
            //         }
            //     }
            //     else if (uiFragment.isHovered) {
            //         uiFragment.isHovered = false;
            //     }
            // }
        });
    }

    public isHoveredFragmentClicked(point: Point): UIFragment {
        let uiFragment = <UIFragment>this.graphics.fragments.uiFragments.find((uiFragment) => uiFragment.isHovered);

        if (uiFragment && uiFragment.onClick) {
            uiFragment.onClick();
        }

        return uiFragment;
    }
}