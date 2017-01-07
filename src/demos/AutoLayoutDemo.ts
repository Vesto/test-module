import { View, Color, Constraint, Appearance } from "quark";
import {Demo} from "./Demo";

export class AutoLayoutDemo extends Demo {
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

        // Add some constraints
        this.useAutoLayout = true;
        this.addConstraints(
            Constraint.fromVFL(
                [
                    "|-[a(c)]-[c]-|",
                    "|-[b(d)]-[d]-|",
                    "[e(d)]-|",
                    "V:|-[a(b)]-[b]-|",
                    "V:|-[c(d,e)]-[d]-[e]-|"
                ],
                {
                    a: a,
                    b: b,
                    c: c,
                    d: d,
                    e: e
                }
            )
        )
    }

    public appearanceChanged(appearance: Appearance): void {
        super.appearanceChanged(appearance);
    }
}
