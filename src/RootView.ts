import { View, Color, Rect, ActivityIndicator } from "quark";

export class RootView extends View {
    private view1: View;
    private view2: View;

    public constructor() {
        super();

        this.view1 = new View();
        this.view2 = new View();
        this.view1.backgroundColor = new Color(1, 0, 1, 1);
        this.view2.backgroundColor = new Color(0, 1, 0, 0);

        var x = new ActivityIndicator();
    }

    layout() {
        super.layout();

        let p = 10; // Padding
        this.view1.rect = new Rect(
            p, p,
            this.rect.size.width / 2 - p * 2, this.rect.size.height / 2 - p * 2
        );
        this.view1.rect = new Rect(
            p, p,
            this.rect.size.width / 2 - p * 2, this.rect.size.height / 2 - p * 2
        );


    }
}
