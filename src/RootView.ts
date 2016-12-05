import { View, Color, Rect, Logger } from "quark";

export class RootView extends View {
    private view1: View;
    private view2: View;

    public constructor() {
        super();

        this.view1 = new View();
        this.view2 = new View();
        this.view1.backgroundColor = new Color(1, 0, 1, 1);
        this.view2.backgroundColor = new Color(0, 1, 0, 1);
        this.addSubview(this.view1);
        this.addSubview(this.view2);

        this.backgroundColor = new Color(1, 1, 0, 1);

        Logger.print(`internal view ${(<any>this).view} ${(<any>this).view.jsView}`)
    }

    layout() {
        super.layout();

        Logger.print("Did layout");

        let p = 10; // Padding
        this.view1.rect = new Rect(
            p, p,
            this.rect.size.width / 2 - p * 2, this.rect.size.height - p * 2
        );
        this.view2.rect = new Rect(
            this.rect.size.width / 2 + p, p,
            this.rect.size.width / 2 - p * 2, this.rect.size.height - p * 2
        );


    }
}
