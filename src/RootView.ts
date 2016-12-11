import { View, Color, Rect, Logger, Button, Point, KeyEvent, InteractionEvent } from "quark";

export class RootView extends View {

    private view1: View;
    private view2: View;
    private button: Button;

    public constructor() {
        super();

        this.view1 = new View();
        this.view2 = new View();
        this.view1.backgroundColor = new Color(1, 0, 1, 1);
        this.view2.backgroundColor = new Color(0, 1, 0, 1);
        this.view1.name = "View 1";
        this.view2.name = "View 2";
        this.addSubview(this.view1);
        this.addSubview(this.view2);

        this.button = new Button();
        this.button.rect = new Rect(0, 0, 100, 100);
        this.addSubview(this.button);

        this.button.buttonDownHandler = (button) => Logger.print(`Button down ${button}`)
        this.button.buttonUpHandler = (button) => Logger.print(`Button up ${button}`)

        this.name = "Root view";
        this.backgroundColor = new Color(1, 1, 0, 1);
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
