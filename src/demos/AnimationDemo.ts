import { View, Size, Point, Color, SegmentedControl, SegmentItem, Button, Appearance, PropertyAnimation, GroupAnimation, SequenceAnimation, Rect, Shadow, Constraint } from "quark";
import { Demo } from "./Demo";

export class AnimationDemo extends Demo {
    public animatingView: View;
    public animationSelector: SegmentedControl;
    public resetButton: Button;

    public viewSize: number = 150;

    public controlHeightConstraint: Constraint;

    public constructor() {
        super();

        // The animating view
        this.animatingView = new View();
        this.resetAnimatingView();
        this.addSubview(this.animatingView);

        // Controls
        this.animationSelector = new SegmentedControl();
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
            if (typeof index === "number") {
                this.animateForIndex(index);
            }
        };
        this.addSubview(this.animationSelector);

        this.resetButton = new Button();
        this.resetButton.title = "Reset View";
        this.resetButton.onButtonUp = () => { this.resetAnimatingView(); };
        this.addSubview(this.resetButton);

        // Add constraints
        this.useAutoLayout = true;
        this.controlHeightConstraint = new Constraint(
            this.animationSelector, Constraint.Attribute.Height, Constraint.Relation.Equal,
            undefined, Constraint.Attribute.Constant,
            1, 0, 1
        );
        this.addConstraint(this.controlHeightConstraint);
        this.addConstraints(Constraint.fromVFL(
            [
                "V:|-[selector]-[reset(selector)]",
                "|-[selector(600),reset(selector)]"
            ],
            {
                selector: this.animationSelector,
                reset: this.resetButton
            }
        ))
    }


    public appearanceChanged(appearance: Appearance): void {
        super.appearanceChanged(appearance);

        // Update the height constraint for controls
        this.controlHeightConstraint.constant = this.appearance.controlSize;
        this.applyConstraints();
    }

    public layout(): void {
        super.layout();

        this.animatingView.center = this.rect.bounds.center;
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
        this.animatingView.center = this.rect.bounds.center;
    }
}
