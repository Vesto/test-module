import { View, InteractionEvent, InteractionType, Point, EventPhase, Rect, Shadow, Color, PropertyAnimation, Appearance } from "quark";

export class DraggableView extends View {
    private previousLocation?: Point;

    public constructor() {
        super();

        this.shadow = this.shadowState(false);
    }

    appearanceChanged(appearance: Appearance) {
        super.appearanceChanged(appearance);

        let oldShadow = this.shadow; // Retain the shadow
        appearance.activeControl.styleView(this);
        this.shadow = oldShadow ? oldShadow : new Shadow(Point.zero, 0, new Color(0, 0, 0, 0));
    }

    interactionEvent(event: InteractionEvent): boolean {
        if (event.type == InteractionType.LeftMouse) {
            if (event.phase == EventPhase.Began) {
                this.previousLocation = event.location;
                this.animateToShadowState(true);
            }  else if (event.phase == EventPhase.Changed) {
                this.updatePosition(event.location);
            } else if (event.phase == EventPhase.Ended || event.phase == EventPhase.Cancelled) {
                this.previousLocation = undefined;
                this.animateToShadowState(false);
            }
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

    private animateToShadowState(dragging: boolean) {
        let animation = new PropertyAnimation<Shadow>();
        animation.target = this;
        animation.property = "shadow";
        animation.to = this.shadowState(dragging);
        animation.duration = 0.1;
        animation.start();
    }

    private shadowState(dragging: boolean): Shadow {
        if (dragging) {
            return new Shadow(new Point(0, 10), 30, new Color(0, 0, 0, 0.5));
        } else {
            return new Shadow(new Point(0, 3), 15, new Color(0, 0, 0, 0.5));
        }
    }
}
