import { View, Color, Rect, Logger, Button, Point, KeyEvent, Label, Appearance, LabelStyle, Image, ImageView, Size, SegmentedControl, SegmentItem, ScrollView } from "quark";
import { DraggableView } from "./DraggableView";
import { DrawingView } from "./DrawingView";
import { AnimatingView } from "./AnimatingView";

declare function getAnImage(): Image; // Temporary to get a test image

export class Root extends View {
    private button: Button;
    private segmentedControl: SegmentedControl;
    private drawingView: DrawingView;
    private label: Label;
    private imageView: ImageView;
    private scrollView: ScrollView;

    public text: string = "";
    public count: number = 0;

    public constructor() {
        super();

        // Create the button
        this.button = new Button();
        this.button.rect = new Rect(0, 0, 100, 0);
        this.button.title = "Click Here";
        this.button.onButtonUp = button => {
            // Logger.print(`Button up ${button}`);
            this.count++;
            this.updateRandomViews();
            this.button.isEmphasized = !this.button.isEmphasized;
        };
        this.addSubview(this.button);

        // Create a segmented control
        this.segmentedControl = new SegmentedControl();
        this.segmentedControl.rect = new Rect(0, 0, 400, 0);
        this.segmentedControl.clearSegments();
        this.segmentedControl.appendSegments(
            new SegmentItem(true, "V", 1),
            new SegmentItem(true, "E", 2),
            new SegmentItem(true, "S", 3),
            new SegmentItem(false, "T", 2),
            new SegmentItem(true, "O", 1),
        );
        this.segmentedControl.selectedIndex = 0;
        this.segmentedControl.onSelection = (control, index) => {
            Logger.print("Selected index", index);
        };
        this.addSubview(this.segmentedControl);

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

        // Create a scroll view
        this.scrollView = new ScrollView();
        this.scrollView.backgroundColor = new Color(1, 1, 1, 0.1);
        this.scrollView.rect = new Rect(0, 300, 300, 200);
        this.scrollView.contentSize = new Size(500, 500);
        this.addSubview(this.scrollView);

        // Add content to the scroll view
        let img = new ImageView();
        img.rect = new Rect(0, 0, 500, 500);
        img.image = getAnImage();
        this.scrollView.addSubview(img);

        let label = new Label();
        label.rect = new Rect(200, 200, 100, 100);
        label.text = "hello, world";
        this.scrollView.addSubview(label);

        // Add scroll type controller
        let scrollType = new SegmentedControl();
        scrollType.rect = new Rect(8, 508, 300 - 16, 44);
        scrollType.clearSegments();
        scrollType.appendSegments(
            new SegmentItem(true, "None", 1),
            new SegmentItem(true, "Horizontal", 1),
            new SegmentItem(true, "Vertical", 1),
            new SegmentItem(true, "Both", 1),
        );
        scrollType.onSelection = (control, index) => {
            switch (index) {
                case 0:
                    this.scrollView.scrollsHorizontally = false;
                    this.scrollView.scrollsVertically = false;
                    break;
                case 1:
                    this.scrollView.scrollsHorizontally = true;
                    this.scrollView.scrollsVertically = false;
                    break;
                case 2:
                    this.scrollView.scrollsHorizontally = false;
                    this.scrollView.scrollsVertically = true;
                    break;
                case 3:
                    this.scrollView.scrollsHorizontally = true;
                    this.scrollView.scrollsVertically = true;
                    break;
            }
        };
        this.addSubview(scrollType);

        // Add scroll randomly button
        let scrollRandomly = new Button();
        scrollRandomly.rect = new Rect(8, 508 + 44 + 8, 300 - 16, 44);
        scrollRandomly.title = "Scroll Randomly";
        scrollRandomly.onButtonUp = () => {
            this.scrollView.contentOffset = new Point(Math.random() * 500, Math.random() * 500);
        };
        this.addSubview(scrollRandomly);

        // Do stuff on scroll
        this.scrollView.onScroll = (scrollView, offset) => {
            scrollRandomly.title = `X: ${offset.x} Y: ${offset.y}`;
        };

        // Demonstrate all the animations
        let typeCount = 6;
        for (let i = 0; i < typeCount; i++) {
            let v = new AnimatingView();
            v.animationKind = i;
            v.rect = new Rect(100 * i, 200, 100, 100);
            this.addSubview(v);
        }

        // Create the draggables
        let draggable1 = new DraggableView();
        draggable1.rect = new Rect(0, 0, 100, 100);
        this.addSubview(draggable1);

        let draggable2 = new DraggableView();
        draggable2.rect = new Rect(100, 0, 100, 100);
        (draggable2 as any).backing._useFilterShadow = false; // Demonstrate rendering differences between filter and drop shadow
        (draggable2 as any).backing.style.filter = "";
        this.addSubview(draggable2);

        let draggable3 = new DraggableView();
        draggable3.rect = new Rect(200, 0, 100, 100);
        draggable3.isBlurred = true;
        this.addSubview(draggable3);

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
        switch (this.count % 5) {
            case 0:
                this.imageView.scalingMode = "none";
                break;
            case 1:
                this.imageView.scalingMode = "fill";
                break;
            case 2:
                this.imageView.scalingMode = "aspect-fit";
                break;
            case 3:
                this.imageView.scalingMode = "aspect-fill";
                break;
            case 4:
                this.imageView.scalingMode = new Size(Math.random(), Math.random());
                break;
        }

        this.imageView.alignment = new Point(Math.random(), Math.random());

        // Segmented control
        this.segmentedControl.isMomentary = this.count % 2 === 0;
    }

    public appearanceChanged(appearance: Appearance) {
        super.appearanceChanged(appearance);

        // Change view styles
        this.backgroundColor = appearance.backgroundColor;

        // Change other stuff
        this.button.rect.size.height = appearance.controlSize;
        this.segmentedControl.rect.size.height = appearance.controlSize;
    }

    layout() {
        // Resize to fix parent
        if (this.superview) {
            this.rect = this.superview.rect.bounds;
        }

        super.layout();

        this.button.center = new Point(
            this.rect.width - this.button.rect.width / 2 - this.appearance.normalControl.padding,
            this.button.rect.height / 2 + this.appearance.normalControl.padding
        );
        this.segmentedControl.center = new Point(
            this.rect.width - this.segmentedControl.rect.width / 2 - this.appearance.normalControl.padding,
            this.button.center.y + this.appearance.controlSize + this.appearance.normalControl.padding
        );
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
