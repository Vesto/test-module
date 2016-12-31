import { View, Color, Rect, Logger, Button, Point, KeyEvent, Label, Timer, Appearance, LabelStyle, Image, ImageView, Size } from "quark";
import { DraggableView } from "./DraggableView";
import { DrawingView } from "./DrawingView";
import { AnimatingView } from "./AnimatingView";

declare function getAnImage(): Image;

export class Root extends View {
    private button: Button;
    private draggable1: DraggableView;
    private draggable2: DraggableView;
    private drawingView: DrawingView;
    private label: Label;
    private imageView: ImageView;

    public text: string = "";
    public count: number = 0;

    public constructor() {
        super();

        // Create the button
        this.button = new Button();
        this.button.rect = new Rect(0, 0, 100, 100);
        this.button.title = "Click Here";
        this.addSubview(this.button);
        // this.button.buttonDownHandler = (button) => Logger.print(`Button down ${button}`);
        this.button.buttonUpHandler = (button) => {
            // Logger.print(`Button up ${button}`);
            this.count++;
            this.updateRandomViews();
            this.button.isEmphasized = !this.button.isEmphasized;
        };

        // Create the draggables
        this.draggable1 = new DraggableView();
        this.draggable1.rect = new Rect(0, 0, 100, 100);
        this.draggable1.backgroundColor = new Color(0.17, 0.53, 0.77, 1.00);
        this.addSubview(this.draggable1);

        this.draggable2 = new DraggableView();
        this.draggable2.rect = new Rect(100, 0, 100, 100);
        this.draggable2.backgroundColor = new Color(0.99, 0.25, 0.39, 1.00);
        (this.draggable2 as any).backing._useFilterShadow = false; // Demonstrate rendering differences between filter and drop shadow
        (this.draggable2 as any).backing.style.filter = "";
        // this.addSubviewAt(this.draggable2, this.subviews.length - 2);
        this.addSubview(this.draggable2);

        // Make drawing
        this.drawingView = new DrawingView();
        this.drawingView.rect = new Rect(0, 100, 100, 100);
        this.addSubview(this.drawingView);

        // Create a label
        this.label = new Label();
        this.label.style = LabelStyle.Text;
        this.label.text = "My Label";
        this.label.rect = new Rect(100, 100, 100, 100);
        this.addSubview(this.label);

        // Create an image
        this.imageView = new ImageView();
        this.imageView.rect = new Rect(200, 100, 100, 100);
        this.imageView.backgroundColor = new Color(1, 1, 1, 0.25);
        this.imageView.image = getAnImage();
        this.addSubview(this.imageView);

        // Demonstrate all the animations
        let typeCount = 6;
        for (let i = 0; i < typeCount; i++) {
            let v = new AnimatingView();
            v.animationKind = i;
            v.rect = new Rect(100 * i, 200, 100, 100);
            this.addSubview(v);
        }

        // Configure this view
        this.name = "Root view";
        // this.backgroundColor = new Color(0.93, 0.93, 0.93, 1.00);
        this.backgroundColor = new Color(0.16, 0.17, 0.21, 1.00);

        // Test the timers
        /*let timer = new Timer(2, timer => {
            Logger.print("Timer triggered");
        });
        timer.repeats = true;
        timer.start();
        Logger.print("Created timer", timer);*/

    }

    public updateRandomViews() {
        // Label
        this.label.textColor = new Color(Math.random(), Math.random(), Math.random(), 1);
        this.label.backgroundColor = new Color(Math.random(), Math.random(), Math.random(), 1);
        this.label.text = `Count: ${this.count}\n${this.text}\nTest`;
        this.label.alignmentMode = this.count % 4;
        this.label.lineBreakMode = this.count % 2;

        // Image view
        switch (this.count % 4) {
            case 0:
                this.imageView.scalingMode = "fill";
                break;
            case 1:
                this.imageView.scalingMode = "aspect-fit";
                break;
            case 2:
                this.imageView.scalingMode = "aspect-fill";
                break;
            case 3:
                this.imageView.scalingMode = new Size(Math.random(), Math.random());
                break;
        }

        this.imageView.alignment = new Point(Math.random(), Math.random());
    }

    public appearanceChanged(appearance: Appearance) {
        super.appearanceChanged(appearance);

        // Change view styles
        this.backgroundColor = appearance.backgroundColor;

        // Change other stuff
        this.button.rect.size.height = appearance.controlSize;
    }

    layout() {
        // this.backgroundColor.red = Math.random();

        // Resize to fix parent
        if (this.superview) {
            this.rect = this.superview.rect.bounds;
        }

        super.layout();

        // let p = 10; // Padding
        // this.view1.rect = new Rect(
        //     p, p,
        //     this.rect.size.width / 2 - p * 2, this.rect.size.height - p * 2
        // );
        // this.view2.rect = new Rect(
        //     this.rect.size.width / 2 + p, p,
        //     this.rect.size.width / 2 - p * 2, this.rect.size.height - p * 2
        // );

        this.button.center = new Point(this.rect.width / 2, this.rect.height / 2);
    }

    keyEvent(event: KeyEvent): boolean {
        if (event.keyCode == 3) {
            Logger.print("F'ed");
            return true; // Absorb the 'f' key
        } else {
            return super.keyEvent(event); // Let the superview handle it
        }
    }
}
