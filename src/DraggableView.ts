import { View, InteractionEvent, InteractionType, Point, EventPhase, Rect } from "quark";

export class DraggableView extends View {
    private previousLocation?: Point;

    interactionEvent(event: InteractionEvent): boolean {
        if (event.type == InteractionType.LeftMouse) {
            if (event.phase == EventPhase.Began)
                this.previousLocation = event.location;
            else if (event.phase == EventPhase.Changed)
                this.updatePosition(event.location);
            else if (event.phase == EventPhase.Ended || event.phase == EventPhase.Cancelled)
                this.previousLocation = undefined;
            return true;
        }

        return super.interactionEvent(event);
    }

    private updatePosition(location: Point) {
        // Make sure there's a previous position
        if (typeof this.previousLocation == "undefined")
            return;

        // Move the view
        let delta = location.add(this.previousLocation.inverse());
        this.rect = new Rect(
            this.rect.x + delta.x, this.rect.y + delta.y,
            this.rect.width, this.rect.height
        );

        // Save the previous position
        this.previousLocation = location;
    }
}