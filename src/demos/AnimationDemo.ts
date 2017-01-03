import { View, Size, Point, Color, SegmentedControl, SegmentItem, Button, Appearance, PropertyAnimation, GroupAnimation, SequenceAnimation, Rect, Shadow } from "quark";
import { Demo } from "./Demo";

export class AnimationDemo extends Demo {
    public animatingView: View;
    public animationSelector: SegmentedControl;
    public resetButton: Button;

    public viewSize: number = 150;

    public constructor() {
        super();

        // The animating view
        this.animatingView = new View();
        this.resetAnimatingView();
        this.addSubview(this.animatingView);

        // Controls
        this.animationSelector = new SegmentedControl();
        this.animationSelector.rect.size = new Size(600, 0);
        this.animationSelector.isMomentary = true;
        this.animationSelector.appendSegments(
            new SegmentItem(true, "Alpha", 1),
            new SegmentItem(true, "Background", 1),
            new SegmentItem(true, "Rect", 1),
            new SegmentItem(true, "Shadow", 1),
            new SegmentItem(true, "Group", 1),
            new SegmentItem(true, "Sequence", 1)
        );
        this.animationSelector.onSelection = (control, index) => {
            if (index) {
                this.animateForIndex(index);
            }
        };
        this.addSubview(this.animationSelector);

        this.resetButton = new Button();
        this.resetButton.rect.size = new Size(this.viewSize, 0);
        this.resetButton.title = "Reset View";
        this.resetButton.onButtonUp = () => { this.resetAnimatingView(); };
        this.addSubview(this.resetButton);
    }


    public appearanceChanged(appearance: Appearance): void {
        super.appearanceChanged(appearance);

        this.animationSelector.rect.size = new Size(this.animationSelector.rect.size.width, appearance.controlSize);
        this.resetButton.rect.size = new Size(this.animationSelector.rect.size.width, appearance.controlSize);
        this.layout();
    }

    public layout(): void {
        super.layout();

        this.animatingView.center = new Point(this.rect.width / 2, this.rect.height / 2);
        this.animationSelector.rect.point = new Point(this.appearance.spacing, this.appearance.spacing);
        this.resetButton.rect.point = new Point(this.appearance.spacing, this.animationSelector.rect.y + this.animationSelector.rect.height + this.appearance.spacing)
    }

    public animateForIndex(index: number) {
        if (index <= 3) { // Other animation types
            this.animationForIndex(index).start();
        } else if (index == 4) { // Group
            let groupAnimation = new GroupAnimation([ this.animationForIndex(0), this.animationForIndex(1), this.animationForIndex(2),this.animationForIndex(3) ]);
            groupAnimation.start();
        } else if (index == 5) {
            let sequenceAnimation = new SequenceAnimation([ this.animationForIndex(0), this.animationForIndex(1), this.animationForIndex(2),this.animationForIndex(3) ]);
            sequenceAnimation.start();
        }
    }

    public animationForIndex(index: number) {
        // Get the animation type
        let animation: PropertyAnimation<any>;
        switch (index) {
            case 0: // Alpha
                animation = new PropertyAnimation<Number>();
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
                    this.animatingView.rect.x + (Math.random() - 0.5) * maxChange,
                    this.animatingView.rect.y + (Math.random() - 0.5) * maxChange,
                    this.animatingView.rect.width + (Math.random() - 0.5) * maxChange,
                    this.animatingView.rect.height + (Math.random() - 0.5) * maxChange,
                );
                break;
            case 3: // Shadow
                // Set a shadow if needed
                if (!this.animatingView.shadow) {
                    this.animatingView.shadow = new Shadow(Point.zero, 0, new Color(0, 0, 0, 0));
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
        animation.target = this.animatingView;
        animation.duration = 0.4;

        return animation;
    }

    public resetAnimatingView() {
        this.animatingView.rect.size = new Size(this.viewSize, this.viewSize);
        this.animatingView.alpha = 1;
        this.animatingView.backgroundColor = new Color(1, 1, 1, 1);
        this.animatingView.shadow = undefined;
        this.animatingView.center = new Point(this.rect.width / 2, this.rect.height / 2);
    }
}