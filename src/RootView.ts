import { View, Color, Rect, Logger, Button, Point, KeyEvent } from "quark";
import { DraggableView } from "./DraggableView";
import { DrawingView } from "./DrawingView";

export class RootView extends View {

    private view1: View;
    private view2: View;
    private button: Button;
    private draggable1: DraggableView;
    private draggable2: DraggableView;
    private drawingView: DrawingView;

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
        this.button.buttonUpHandler = (button) => Logger.print(`Button up ${button}`);

        // Create the draggabls
        this.draggable1 = new DraggableView();
        this.draggable1.rect = new Rect(0, 0, 100, 100);
        this.draggable1.backgroundColor = new Color(0.17, 0.53, 0.77, 1.00);
        this.addSubview(this.draggable1);

        this.draggable2 = new DraggableView();
        this.draggable2.rect = new Rect(100, 0, 100, 100);
        this.draggable2.backgroundColor = new Color(0.99, 0.25, 0.39, 1.00);
        this.addSubview(this.draggable2);

        // Make drawing
        this.drawingView = new DrawingView();
        this.drawingView.rect = new Rect(10, 10, 500, 500);
        this.addSubview(this.drawingView)

        // Configure this view
        this.name = "Root view";
        this.backgroundColor = new Color(0.93, 0.93, 0.93, 1.00);
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
