import { View, InteractionEvent, InteractionType, EventPhase, PropertyAnimation, Interpolatable, Color, Rect, Shadow, Point, Animation, GroupAnimation, SequenceAnimation } from "quark";

export class AnimatingView extends View {
    public animationKind: number = 0;

    interactionEvent(event: InteractionEvent): boolean {
        if (event.type == InteractionType.LeftMouse && event.phase == EventPhase.Ended) {
            if (this.animationKind <= 3) { // Other animation types
                this.animationForIndex(this.animationKind).start();
            } else if (this.animationKind == 4) { // Group
                let groupAnimation = new GroupAnimation([ this.animationForIndex(0), this.animationForIndex(1), this.animationForIndex(2),this.animationForIndex(3) ]);
                groupAnimation.start();
            } else if (this.animationKind == 5) {
                let sequenceAnimation = new SequenceAnimation([ this.animationForIndex(0), this.animationForIndex(1), this.animationForIndex(2),this.animationForIndex(3) ]);
                sequenceAnimation.start();
            }

            return true;
        }

        return super.interactionEvent(event);
    }

    private animationForIndex(index: number): Animation {
        // Get the animation type
        let animation: PropertyAnimation<Interpolatable>;
        switch (index) {
            case 0: // Alpha
                animation = new PropertyAnimation<number>();
                animation.property = "alpha";
                animation.to = Math.random();
                break;
            case 1: // Background
                animation = new PropertyAnimation<Color>();
                animation.property = "backgroundColor";
                animation.to = new Color(Math.random(), Math.random(), Math.random(), 1);
                break;
            case 2: // Rect
                let maxChange = 50;
                animation = new PropertyAnimation<Rect>();
                animation.property = "rect";
                animation.to = new Rect(
                    this.rect.x + (Math.random() - 0.5) * maxChange,
                    this.rect.y + (Math.random() - 0.5) * maxChange,
                    this.rect.width + (Math.random() - 0.5) * maxChange,
                    this.rect.height + (Math.random() - 0.5) * maxChange,
                );
                break;
            case 3: // Shadow
                // Set a shadow if needed
                if (!this.shadow) {
                    this.shadow = new Shadow(Point.zero, 0, new Color(0, 0, 0, 0));
                }

                animation = new PropertyAnimation<Shadow>();
                animation.property = "shadow";
                animation.to = new Shadow(
                    new Point((Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20),
                    Math.random() * 40,
                    new Color(Math.random(), Math.random(), Math.random(), 1)
                );
                break;
            default:
                throw new Error(`No animation kind ${index}`);
        }


        // Start the animation
        animation.target = this;
        animation.duration = 0.3;

        return animation;
    }
}