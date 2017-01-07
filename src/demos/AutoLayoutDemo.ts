import { View, Color, Constraint, Appearance, SegmentedControl, SegmentItem } from "quark";
import {Demo} from "./Demo";

export class AutoLayoutDemo extends Demo {
    public layoutSelector: SegmentedControl;

    public views: View[];
    public layouts: Constraint[][];
    public layoutIndex: number = -1;

    public controlHeightConstraint: Constraint;

    public constructor() {
        super();

        // Create some views
        let a = new View();
        let b = new View();
        let c = new View();
        let d = new View();
        let e = new View();
        a.backgroundColor = Color.red;
        b.backgroundColor = Color.green;
        c.backgroundColor = Color.blue;
        d.backgroundColor = Color.cyan;
        e.backgroundColor = Color.purple;
        this.addSubview(a);
        this.addSubview(b);
        this.addSubview(c);
        this.addSubview(d);
        this.addSubview(e);
        this.views = [ a, b, c, d, e ];

        // Create some layouts
        let views = {
            a: a,
            b: b,
            c: c,
            d: d,
            e: e
        };
        this.layouts = [
            Constraint.fromVFL(
                [
                    "|-[a(100)]-[b]-[c(b)]-[d(b)]-[e(a)]-|",
                    "V:|-[a,b,c,d,e]-|"
                ],
                views
            ),
            Constraint.fromVFL( // B
                [
                    "|-[a]-[b(a*2)]-[c(b/3)]-[d(c+100)]-[e(d-50)]-|",
                    "V:|-[a,b,c,d,e]-|"
                ],
                views
            ),
            Constraint.fromVFL(
                [
                    "|-[a(c)]-[c]-|",
                    "|-[b(d)]-[d]-|",
                    "[e(d)]-|",
                    "V:|-[a(b)]-[b]-|",
                    "V:|-[c(d,e)]-[d]-[e]-|"
                ],
                views
            ),
            Constraint.fromVFL(
                [
                    "|-[a]-|",
                    "|-[b]-[c(200)]-|",
                    "V:|-[a(100)]-[b,c]-|",
                    "[d(d.height)]-[e(d)]-(16)-|",
                    "V:|-(16)-[d(a.height-16),e(d)]",
                ],
                views
            ),
            Constraint.fromVFL(
                [
                    "|~[a(50)]~[b(a)]~[c(a)]~[d(a)]~[e(a)]~|",
                    "V:|~[a(a.width),b(a),c(a),d(a),e(a)]~|"
                ],
                views
            ),
            Constraint.fromVFL(
                [
                    "|~[a(200),b(a),c(a),d(a),e(a)]~|",
                    "V:|~[a(50)]-[b(a)]-[c(a)]-[d(a)]-[e(a)]~|"
                ],
                views
            ),
            Constraint.fromVFL(
                [
                    "|~[a(50)]-[b(a.height),c(b),d(b)]-[e(a)]~|",
                    "V:|~[b(a.width)]-[c(b)]-[d(b)]~|",
                    "V:|~[a(a.width*3+16),e(a)]~|"
                ],
                views
            ),
            Constraint.fromVFL(
                [
                    "|~[a(<=100)]-[b(a.height),c(b),d(b)]-[e(a)]~|",
                    "V:|~[b(a.width)]-[c(b)]-[d(b)]~|",
                    "V:|~[a(a.width*3+16),e(a)]~|"
                ],
                views
            ),
        ];

        // Add a layout selector
        this.layoutSelector = new SegmentedControl();
        this.layoutSelector.appendSegments(
            new SegmentItem(true, "A", 1),
            new SegmentItem(true, "B", 1),
            new SegmentItem(true, "C", 1),
            new SegmentItem(true, "D", 1),
            new SegmentItem(true, "E", 1),
            new SegmentItem(true, "F", 1),
            new SegmentItem(true, "G", 1)
        );
        this.layoutSelector.selectedIndex = 0;
        this.layoutSelector.onSelection = (control, index) => {
            if (typeof index === "number") {
                this.transitionToLayout(index);
            }
        };
        this.addSubview(this.layoutSelector);
        this.addConstraints(Constraint.fromVFL([ "|-[v(400)]", "V:|-[v]"], { v: this.layoutSelector }));
        this.controlHeightConstraint = new Constraint(
            this.layoutSelector, Constraint.Attribute.Height, Constraint.Relation.Equal,
            undefined, Constraint.Attribute.Constant,
            1, 0, 1
        );
        this.addConstraint(this.controlHeightConstraint);

        // Set to use auto layout
        this.useAutoLayout = true;

        // Apply the first layout
        this.transitionToLayout(0, false);
    }

    public appearanceChanged(appearance: Appearance): void {
        super.appearanceChanged(appearance);

        // Set corner radius of views
        for (let view of this.views) {
            view.cornerRadius = appearance.cornerRadius;
        }

        // Configure control size
        this.controlHeightConstraint.constant = appearance.controlSize;
        this.applyConstraints();
    }

    public transitionToLayout(index: number, animated: boolean = true) {
        // Clear the previous constraints
        if (this.layoutIndex !== -1)
            this.removeConstraints(this.layouts[this.layoutIndex]);

        // Add the new constraints
        this.addConstraints(this.layouts[index]);

        // Apply the constraints
        this.applyConstraints(animated);

        // Set the layout index
        this.layoutIndex = index;
    }
}
