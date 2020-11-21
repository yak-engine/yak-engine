import Primitive from "../primitives/primitive";
import Transform from "../primitives/transform";
import UIFragment from "../ui/ui-base";
import EditorImageSource from "./editor-image-source";
import Sprite from "./sprite";

/**
 * Contains the fragments to be rendered to the canvas on each iteration
 * of the game loop.
 * 
 * @author NSSure
 * @since 11/9/2020
 */
export default class Fragments {
    uiFragments: Array<UIFragment> = new Array();
    transformFragments: Array<Transform> = new Array();
    spriteFragments: Array<Sprite> = new Array();
    editorFragments: Array<EditorImageSource> = new Array();
}