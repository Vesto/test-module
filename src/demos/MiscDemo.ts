import { View, Rect, Point } from "quark";
import { DraggableView } from "../DraggableView";
import { Demo } from "./Demo";

export class MiscDemo extends Demo {
    public draggable1: DraggableView;
    public draggable2: DraggableView;
    public draggable3: DraggableView;

    public constructor() {
        super();

        // Normal draggable
        this.draggable1 = new DraggableView();
        this.draggable1.rect = new Rect(0, 0, 100, 100);
        this.addSubview(this.draggable1);

        // A draggable demonstrating box blur
        this.draggable2 = new DraggableView();
        this.draggable2.rect = new Rect(100, 0, 100, 100);
        (this.draggable2 as any).backing._useFilterShadow = false; // Demonstrate rendering differences between filter and drop shadow
        (this.draggable2 as any).backing.style.filter = "";
        this.addSubview(this.draggable2);

        // A blurred background draggable
        this.draggable3 = new DraggableView();
        this.draggable3.rect = new Rect(200, 0, 100, 100);
        this.draggable3.isBlurred = true;
        this.addSubview(this.draggable3);
    }


    public layout(): void {
        super.layout();

    }
}