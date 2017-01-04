import { View, Color, Rect, Point, Appearance, Image, Size, SegmentedControl, SegmentItem, Logger } from "quark";
import { ImageDemo } from "./demos/ImageDemo";
import { LabelDemo } from "./demos/LabelDemo";
import { MiscDemo } from "./demos/MiscDemo";
import { ScrollViewDemo } from "./demos/ScrollViewDemo";
import { TimerDemo } from "./demos/TimerDemo";
import { AnimationDemo } from "./demos/AnimationDemo";
import { Demo } from "./demos/Demo";
import { ProjectManagement } from "./demos/project_management/ProjectManagement";

declare global {
    function getAnImage(): Image; // Temporary to get a test image
}

export class Root extends View {
    public demos: { [name: string]: Demo; } = {
        "Project Management": new ProjectManagement(),
        "Animation": new AnimationDemo(),
        "Label": new LabelDemo(),
        "Image": new ImageDemo(),
        "Scroll View": new ScrollViewDemo(),
        "Timer": new TimerDemo(),
        "Misc": new MiscDemo(),
    };

    public titleBar: View;
    public tabControl: SegmentedControl;

    public selectedDemo: string;

    public constructor() {
        super();

        // Create the title bar
        this.titleBar = new TitleBar();
        this.addSubview(this.titleBar);

        // Create the control
        this.tabControl = new SegmentedControl();
        this.tabControl.rect.size = new Size(800, 23);
        this.tabControl.onSelection = (control, index) => {
            this.selectDemo(control.segments[index as number].content as string);
        };
        this.titleBar.addSubview(this.tabControl);

        // Map the demos
        for (let demoName in this.demos) {
            let demo = this.demos[demoName];

            // Add as segment
            this.tabControl.appendSegment(new SegmentItem(true, demoName, demoName === "Project Management" ? 2 : 1));

            // Hide the demo
            demo.isHidden = true;

            // Add as subviews
            this.addSubview(demo);
        }

        // Select first demo
        this.tabControl.selectedIndex = 0;

        // Configure this view
        this.name = "Root view";
        // this.backgroundColor = new Color(0.93, 0.93, 0.93, 1.00);
        this.backgroundColor = new Color(0.16, 0.17, 0.21, 1.00);
    }

    public appearanceChanged(appearance: Appearance) {
        super.appearanceChanged(appearance);

        // Change view styles
        this.backgroundColor = appearance.backgroundColor;
    }

    public layout() {
        // Resize to fit parent
        if (this.superview) {
            this.rect = this.superview.rect.bounds;
        }

        super.layout();

        // Change the title bar
        this.titleBar.rect = new Rect(0, 0, this.rect.width, 38);

        // Move the tab layout to the appropriate position
        this.tabControl.center = this.titleBar.rect.bounds.center;

        // Resize the demos
        for (let demoName in this.demos) {
            let demo = this.demos[demoName];

            let yOffset = this.titleBar.rect.height
            demo.rect = new Rect(
                0, yOffset,
                this.rect.width, this.rect.height - yOffset
            );
        }
    }

    public selectDemo(index: string) {
        // Hide current
        if (this.demos[this.selectedDemo]) {
            this.demos[this.selectedDemo].isHidden = true;
        }

        // Show next
        this.demos[index].isHidden = false;
        this.selectedDemo = index;
    }
}

// TODO: add official title bar support
export class TitleBar extends View {
    public constructor() {
        super();

        // Make the region draggable
        (this.backing as any).style.webkitAppRegion = "drag";
    }

    public get appearance(): Appearance { return this._appearance; }
    public set appearance(appearance: Appearance) {
        // Clone, modify, and set new appearance
        let newAppearance = appearance.clone();
        newAppearance.secondaryColor = appearance.backgroundColor;
        newAppearance.backgroundColor = appearance.secondaryColor;
        newAppearance.controlSize = 23;
        super.appearance = newAppearance;

        // Set background
        this.backgroundColor = this.appearance.backgroundColor;
    }
}
