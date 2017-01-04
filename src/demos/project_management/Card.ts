import { View, Label, LabelStyle, Appearance, Rect, Size } from "quark";

export class Card extends View {
    public title: Label;

    public constructor(title: string) {
        super();

        // Create the title
        this.title = new Label();
        this.title.text = title;
        this.title.style = LabelStyle.Subtitle;
        this.addSubview(this.title);
    }

    public layout(): void {
        super.layout();

        // Resize this view based on the rect's text size
        let textSize = this.title.textSize;
        this.rect.size = new Size(this.rect.size.width, textSize.height + this.appearance.spacing * 2);

        // Resize the title
        this.title.rect = new Rect(
            this.appearance.spacing, this.appearance.spacing,
            this.rect.width - this.appearance.spacing * 2, this.rect.height - this.appearance.spacing * 2
        );
    }

    public appearanceChanged(appearance: Appearance): void {
        super.appearanceChanged(appearance);

        this.title.textColor = appearance.primaryColor;
        this.backgroundColor = appearance.secondaryColor;
        this.cornerRadius = appearance.cornerRadius;
    }
}