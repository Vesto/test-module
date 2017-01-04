import { Label, Size, Point, SegmentedControl, SegmentItem, TextField, Font, Color, View, Rect, Logger, LabelStyle, Appearance } from "quark";
import { Demo } from "./Demo";

export class LabelDemo extends Demo {
    public label: Label;

    public textContent: TextField;
    // TODO: Font size when have slider
    public fontFamily: TextField;
    public textColor: SegmentedControl;
    // TODO: Line count when have slider
    public lineBreak: SegmentedControl;
    public alignment: SegmentedControl;
    public verticalAlignment: SegmentedControl;
    public style: SegmentedControl;
    public sizeIndicator: Label;

    public constructor() {
        super();

        // Create the label
        this.label = new Label();
        this.label.rect.size = new Size(200, 200);
        this.label.text = "Test";
        this.addSubview(this.label);

        // Controls
        this.textContent = new TextField();
        this.textContent.onChange = (field, text) => {
            this.updateText();
        };
        this.textContent.text = "Hello, world!";
        this.addSubview(this.textContent);

        this.fontFamily = new TextField();
        this.fontFamily.onChange = () => {
            this.updateFont();
        };
        this.fontFamily.text = "Source Sans Pro";
        this.addSubview(this.fontFamily);

        this.textColor = new SegmentedControl();
        this.textColor.appendSegments(
            new SegmentItem(true, "White", 1),
            new SegmentItem(true, "Black", 1),
            new SegmentItem(true, "Red", 1),
            new SegmentItem(true, "Blue", 1),
            new SegmentItem(true, "Random", 1)
        );
        this.textColor.onSelection = (control, index) => {
            switch (index) {
                case 0:
                    this.label.textColor = new Color(1, 1, 1, 1);
                    break;
                case 1:
                    this.label.textColor = new Color(0, 0, 0, 1);
                    break;
                case 2:
                    this.label.textColor = new Color(1, 0, 0, 1);
                    break;
                case 3:
                    this.label.textColor = new Color(0, 0, 1, 1);
                    break;
                case 4:
                    this.label.textColor = new Color(Math.random(), Math.random(), Math.random(), 1);
                    break;
            }
        };
        this.textColor.selectedIndex = 0;
        this.addSubview(this.textColor);

        this.lineBreak = new SegmentedControl();
        this.lineBreak.appendSegments(
            new SegmentItem(true, "Word Wrap", 1),
            new SegmentItem(true, "Character Wrap", 1)
        );
        this.lineBreak.onSelection = (control, index) => {
            if (typeof index === "number") {
                // This works because the segment items are mapped to the corresponding enum values
                this.label.lineBreakMode = index;
            }
        };
        this.lineBreak.selectedIndex = 0;
        this.addSubview(this.lineBreak);

        this.alignment = new SegmentedControl();
        this.alignment.appendSegments(
            new SegmentItem(true, "Left", 1),
            new SegmentItem(true, "Right", 1),
            new SegmentItem(true, "Center", 1),
            new SegmentItem(true, "Justify", 1)
        );
        this.alignment.onSelection = (control, index) => {
            if (typeof index === "number") {
                this.label.alignmentMode = index;
            }
        };
        this.alignment.selectedIndex = 2;
        this.addSubview(this.alignment);

        this.verticalAlignment = new SegmentedControl();
        this.verticalAlignment.appendSegments(
            new SegmentItem(true, "Top", 1),
            new SegmentItem(true, "Bottom", 1),
            new SegmentItem(true, "Center", 1)
        );
        this.verticalAlignment.onSelection = (control, index) => {
            if (typeof index === "number") {
                this.label.verticalAlignmentMode = index;
            }
        };
        this.verticalAlignment.selectedIndex = 2;
        this.addSubview(this.verticalAlignment);

        this.style = new SegmentedControl();
        this.style.isMomentary = true;
        this.style.appendSegments(
            new SegmentItem(true, "Title", 1),
            new SegmentItem(true, "Subtitle", 1),
            new SegmentItem(true, "Text", 1),
            new SegmentItem(true, "Subtext", 1),
            new SegmentItem(true, "None", 1)
        );
        this.style.onSelection = (control, index) => {
            if (typeof index === "number") {
                this.label.style = index;
            }
        };
        this.style.selectedIndex = 2;
        this.addSubview(this.style);

        this.sizeIndicator = new Label();
        this.sizeIndicator.style = LabelStyle.Text;
        this.addSubview(this.sizeIndicator);

        // Update the properties
        this.updateText();
        this.updateFont();
    }

    public updateText() {
        // Update the text
        this.label.text = this.textContent.text;

        // Update the text size
        let size = this.label.textSize;
        this.sizeIndicator.text = `${size.width}x${size.height}`;
    }

    public updateFont() {
        try {
            this.label.font = new Font(this.label.font.size, { family: this.fontFamily.text });
            Logger.print("Valid font");
        } catch(e) {
            Logger.print("Invalid font", this.fontFamily.text);
        }
    }

    public appearanceChanged(appearance: Appearance): void {
        super.appearanceChanged(appearance);

        this.sizeIndicator.textColor = appearance.primaryColor;
    }

    public layout(): void {
        super.layout();

        // Center the label
        this.label.center = new Point(this.rect.width / 2 - this.label.rect.width - this.appearance.spacing, this.label.rect.height / 2 + this.appearance.spacing);

        // Layout the controls
        let controls: View[] = [ this.textContent, this.fontFamily, this.textColor, this.lineBreak, this.alignment, this.verticalAlignment, this.style, this.sizeIndicator ];
        let yShift = this.appearance.spacing;
        for (let control of controls) {
            control.rect = new Rect(
                this.rect.width / 2 + this.appearance.spacing, yShift,
                400, this.appearance.controlSize
            );

            yShift += control.rect.height + this.appearance.spacing;
        }
    }
}

/*
 // Create a focusable view
 let focusView = new View();
 focusView.rect = new Rect(300, 100, 100, 100);
 focusView.focusable = true;
 focusView.backgroundColor = new Color(1, 0, 0, 1);
 focusView.focusEvent = (event) => {
 Logger.print("Focused", event.focused);
 return true;
 };
 focusView.keyEvent = (event) => {
 if (event.phase == KeyPhase.Down || event.phase == KeyPhase.Repeat) {
 if (event.keyCode === 13) {
 this.text += "\n";
 } else if (event.keyCode === 8) {
 this.text = this.text.substring(0, this.text.length - 1);
 } else {
 this.text += event.rawEvent.key;
 }
 this.updateRandomViews();
 Logger.print("Key event", event.keyCode);
 }
 return true;
 };
 this.addSubview(focusView);
 */
