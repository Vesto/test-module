import { View, InteractionEvent, Color, InteractionType, Point, Rect, Module, Logger, } from "quark";
import { Delegate } from "./Delegate";

export class DrawingView extends View {
    constructor() {
        super();

        this.backgroundColor = new Color(1, 1, 1, 1);
    }

    interactionEvent(event: InteractionEvent): boolean {
        if (event.type == InteractionType.LeftMouse) {
            this.drawAt(event.location);
            return true;
        }

        return super.interactionEvent(event);
    }

    private drawAt(location: Point) {
        let newLocation = Delegate.window.rootView.convertPointTo(this, location);
        let v = new View();
        // noinspection JSSuspiciousNameCombination
        v.rect = new Rect(Math.floor(newLocation.x), Math.floor(newLocation.y), 1, 1);
        v.backgroundColor = new Color(0, 0, 0, 1);
        this.addSubview(v);
    }
}