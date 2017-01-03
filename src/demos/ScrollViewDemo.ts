import { View, Rect, ScrollView, ImageView, Label, SegmentedControl, SegmentItem, Color, Size, Button, Point, Appearance, LabelStyle, TextAlignmentMode } from "quark";
import { Demo } from "./Demo";

export class ScrollViewDemo extends Demo {
    public scrollView: ScrollView;
    public scrollType: SegmentedControl;
    public scrollRandomly: Button;
    public scrollInfo: Label;

    public scrollViewSize = new Size(300, 300);

    public constructor() {
        super();

        // Create a scroll view
        this.scrollView = new ScrollView();
        this.scrollView.backgroundColor = new Color(1, 1, 1, 0.1);
        this.scrollView.rect.size = this.scrollViewSize;
        this.scrollView.contentSize = new Size(500, 500);
        this.addSubview(this.scrollView);

        // Add content to the scroll view
        let img = new ImageView();
        img.rect.size = this.scrollView.contentSize.clone();
        img.image = getAnImage();
        this.scrollView.addSubview(img);

        let label = new Label();
        label.rect = new Rect(200, 200, 100, 100);
        label.text = "hello, world";
        this.scrollView.addSubview(label);

        // Add scroll type controller
        this.scrollType = new SegmentedControl();
        this.scrollType.rect.size = new Size(this.scrollViewSize.width, 0);
        this.scrollType.clearSegments();
        this.scrollType.appendSegments(
            new SegmentItem(true, "None", 1),
            new SegmentItem(true, "Horizontal", 1),
            new SegmentItem(true, "Vertical", 1),
            new SegmentItem(true, "Both", 1),
        );
        this.scrollType.onSelection = (control, index) => {
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
        this.scrollType.selectedIndex = 0;
        this.addSubview(this.scrollType);

        // Add scroll randomly button
        this.scrollRandomly = new Button();
        this.scrollRandomly.rect.size = new Size(this.scrollViewSize.width, 0);
        this.scrollRandomly.title = "Scroll Randomly";
        this.scrollRandomly.onButtonUp = () => {
            this.scrollView.contentOffset = new Point(Math.random() * 500, Math.random() * 500);
        };
        this.addSubview(this.scrollRandomly);

        // Scroll view info label
        this.scrollInfo = new Label();
        this.scrollInfo.rect.size = new Size(this.scrollViewSize.width, 20);
        this.scrollInfo.style = LabelStyle.Text;
        this.scrollInfo.alignmentMode = TextAlignmentMode.Center;
        this.addSubview(this.scrollInfo);

        // Do stuff on scroll
        this.scrollView.onScroll = (scrollView, offset) => {
            this.scrollInfo.text = `X: ${offset.x} Y: ${offset.y} W: ${scrollView.contentSize.width} H: ${scrollView.contentSize.height}`;
        };
    }

    public appearanceChanged(appearance: Appearance): void {
        super.appearanceChanged(appearance);

        this.scrollType.rect.size = new Size(this.scrollType.rect.size.width, this.appearance.controlSize);
        this.scrollRandomly.rect.size = new Size(this.scrollRandomly.rect.size.width, this.appearance.controlSize);
    }

    public layout(): void {
        super.layout();

        this.scrollView.center = new Point(this.rect.width / 2, this.rect.height / 2);
        this.scrollInfo.center = new Point(this.rect.width / 2, this.rect.height / 2 - this.scrollViewSize.height / 2 - this.scrollInfo.rect.height / 2 - this.appearance.spacing);
        this.scrollType.center = new Point(this.rect.width / 2, this.rect.height / 2 + this.scrollViewSize.height / 2 + this.appearance.controlSize + this.appearance.spacing);
        this.scrollRandomly.center = new Point(this.rect.width / 2, this.scrollType.center.y + this.appearance.controlSize + this.appearance.spacing)
    }
}