import { View, InteractionEvent, InteractionType, Point, EventPhase, Rect, Shadow, Color, PropertyAnimation, Appearance, Vector, AnimationLoop, ScrollEvent } from "quark";

export class DraggableView extends View {
    private previousPointerTime: number;
    private previousPreviousPointerTime: number;

    private previousLocation: Point;
    private previousPreviousLocation: Point;

    private velocity?: Vector;


    public constructor() {
        super();

        // Add hte basic shadow
        this.shadow = this.shadowState(false);

        // Hook into the animation loop to do the velocity
        AnimationLoop.addHook(dt => {
            if (this.velocity) {
                // Move the view
                this.center = this.center.add(this.velocity.multiply(dt));

                // Slow down the velocity
                this.velocity = this.velocity.multiply(1 - dt * 3);
            }
        });
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
                this.previousPreviousLocation = event.location;
                this.previousPointerTime = Date.now();
                this.previousPreviousPointerTime = Date.now();

                this.animateToShadowState(true);

                // Clear the velocity
                this.velocity = undefined;
            }  else if (event.phase == EventPhase.Changed) {
                this.updatePosition(event.location);
            } else if (event.phase == EventPhase.Ended || event.phase == EventPhase.Cancelled) {
                // Calculate the final velocity
                let dt = (Date.now() - this.previousPreviousPointerTime) / 1000;
                this.velocity = event.location
                        .subtract(this.previousPreviousLocation)
                        .multiply(1 / dt);

                this.animateToShadowState(false);
            }
            return true;
        }

        return super.interactionEvent(event);
    }


    scrollEvent(event: ScrollEvent): boolean {
        // Scale on scroll
        let oldCenter = this.center;
        let scale = 0.2;
        this.rect.size.width += event.deltaScroll.x * scale;
        this.rect.size.height += event.deltaScroll.y * scale;
        this.center = oldCenter;

        return true;
    }

    private updatePosition(location: Point) {
        // Make sure there's a previous position
        if (!this.previousLocation) { return; }

        // Move the view
        let delta = location.add(this.previousLocation.inverse());
        this.rect = new Rect(
            this.rect.x + delta.x, this.rect.y + delta.y,
            this.rect.width, this.rect.height
        );

        // Save the previous position
        this.previousPreviousLocation = this.previousLocation;
        this.previousPreviousPointerTime = this.previousPointerTime;
        this.previousLocation = location;
        this.previousPointerTime = Date.now();
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
