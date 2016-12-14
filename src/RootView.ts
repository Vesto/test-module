import { View, Color, Rect, Logger, Button, Point, KeyEvent, Label } from "quark";
import { DraggableView } from "./DraggableView";
import { DrawingView } from "./DrawingView";

export class RootView extends View {

    private view1: View;
    private view2: View;
    private button: Button;
    private draggable1: DraggableView;
    private draggable2: DraggableView;
    private drawingView: DrawingView;
    private label: Label;

    public text: string = "";
    public count: number = 100000;

    public constructor() {
        super();

        // Create some views
        this.view1 = new View();
        this.view2 = new View();
        this.view1.backgroundColor = new Color(0.99, 0.69, 0.16, 1.00);
        this.view2.backgroundColor = new Color(0.42, 0.94, 0.38, 1.00);
        this.view1.name = "View 1";
        this.view2.name = "View 2";
        this.addSubview(this.view1);
        this.addSubview(this.view2);

        // Create the button
        this.button = new Button();
        this.button.rect = new Rect(0, 0, 100, 100);
        this.addSubview(this.button);
        this.button.buttonDownHandler = (button) => Logger.print(`Button down ${button}`);
        this.button.buttonUpHandler = (button) => {
            Logger.print(`Button up ${button}`);
            this.count++;
            this.updateLabel()
        };

        // Create the draggables
        this.draggable1 = new DraggableView();
        this.draggable1.rect = new Rect(0, 0, 100, 100);
        this.draggable1.backgroundColor = new Color(0.17, 0.53, 0.77, 1.00);
        this.addSubview(this.draggable1);

        this.draggable2 = new DraggableView();
        this.draggable2.rect = new Rect(100, 0, 100, 100);
        this.draggable2.backgroundColor = new Color(0.99, 0.25, 0.39, 1.00);
        this.addSubviewAt(this.draggable2, this.subviews.length - 2);

        // Make drawing
        this.drawingView = new DrawingView();
        this.drawingView.rect = new Rect(10, 10, 100, 100);
        this.view2.addSubview(this.drawingView);

        // Create a label
        this.label = new Label();
        this.label.text = "My Label";
        this.label.rect = new Rect(100, 100, 100, 100);
        this.addSubview(this.label);

        // Configure this view
        this.name = "Root view";
        this.backgroundColor = new Color(0.93, 0.93, 0.93, 1.00);
    }

    public updateLabel() {
        this.label.color = new Color(Math.random(), Math.random(), Math.random(), 1);
        this.label.backgroundColor = new Color(Math.random(), Math.random(), Math.random(), 1);
        this.label.text = `Count: ${this.count}\n${this.text}`;
        this.label.alignmentMode = this.count % 4;
        this.label.lineBreakMode = this.count % 6;
    }

    layout() {
        super.layout();

        // Logger.print("Did layout");

        let p = 10; // Padding
        this.view1.rect = new Rect(
            p, p,
            this.rect.size.width / 2 - p * 2, this.rect.size.height - p * 2
        );
        this.view2.rect = new Rect(
            this.rect.size.width / 2 + p, p,
            this.rect.size.width / 2 - p * 2, this.rect.size.height - p * 2
        );

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
