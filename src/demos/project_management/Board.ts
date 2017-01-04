import { View, Size, Label, Appearance, ScrollView, LabelStyle, Rect, Button, Color } from "quark";
import { Card } from "./Card";
import { generateExampleText } from "../../utils/ExampleText";

export class Board extends View {
    public cards: Card[] = [];
    public width: number = 275;

    public title: Label;
    public cardContainer: ScrollView;
    public addCardButton: Button;

    /// The maximum height the board can have in the parent.
    public get maxHeight(): number {
        if (this.superview) {
            return this.superview.rect.height - this.appearance.spacing * 2;
        } else {
            return 0;
        }
    }

    /// The minimum height the board can have based on title and cards
    public get minHeight(): number {
        return this.title.rect.height + this.cardsHeight + this.addCardButton.rect.height + this.appearance.spacing * 2;
    }

    /// The height of the cards.
    public get cardsHeight(): number {
        let height: number = 0;
        for (let card of this.cards) {
            card.layout();
            height += card.rect.height + this.appearance.spacing;
        }
        height -= this.appearance.spacing; // Subtract the last spacing
        return height;
    }

    public constructor(title: string) {
        super();

        // Create the title
        this.title = new Label();
        this.title.style = LabelStyle.Title;
        this.title.text = title;
        this.addSubview(this.title);

        // Create the container
        this.cardContainer = new ScrollView();
        this.cardContainer.backgroundColor = Color.clear;
        this.addSubview(this.cardContainer);

        // Create the card button
        this.addCardButton = new Button();
        this.addCardButton.title = "Add a card...";
        this.addSubview(this.addCardButton);

        // Add some cards
        for (let i = 0; i < Math.random() * 20 + 2; i++) {
            let card = new Card(generateExampleText(Math.random() * 10 + 1));
            card.rect.size = new Size(0, 60);
            this.cardContainer.addSubview(card);
            this.cards.push(card);
        }
    }

    public layout(): void {
        super.layout();

        // Layout the components
        this.title.rect = new Rect(
            this.appearance.spacing, 0,
            this.rect.width - this.appearance.spacing * 2, 36
        );
        this.addCardButton.rect = new Rect(
            this.appearance.spacing, this.rect.height - this.appearance.controlSize - this.appearance.spacing,
            this.rect.width - this.appearance.spacing * 2, this.appearance.controlSize
        );
        this.cardContainer.rect = new Rect(
            0, this.title.rect.maxY,
            this.rect.width, this.addCardButton.rect.minY - this.title.rect.maxY - this.appearance.spacing
        );
        this.cardContainer.contentSize = new Size(this.cardContainer.rect.width, this.cardsHeight);

        // Layout the cards
        let yShift = 0;
        for (let card of this.cards) {
            card.rect = new Rect(
                this.appearance.spacing, yShift,
                this.cardContainer.contentSize.width - this.appearance.spacing * 2, card.rect.height
            );
            yShift += card.rect.height + this.appearance.spacing;
        }
    }

    public appearanceChanged(appearance: Appearance): void {
        super.appearanceChanged(appearance);

        // Style the main components
        this.backgroundColor = appearance.tertiaryColor;
        this.title.textColor = appearance.primaryColor;
        this.cornerRadius = appearance.cornerRadius;
    }

    public resizeBoard(): void {
        // Resize the board to the maximum height
        this.rect.size = new Size(this.width, this.maxHeight < this.minHeight ? this.maxHeight : this.minHeight);
    }
}