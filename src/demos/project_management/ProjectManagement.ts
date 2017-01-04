import { ScrollView, Point, Color, Appearance } from "quark";
import { Demo } from "../Demo";
import { Board } from "./Board";

export class ProjectManagement extends Demo {
    public boardContainer: ScrollView;
    public boards: Board[] = [];

    public constructor() {
        super();

        // Create container
        this.boardContainer = new ScrollView();
        this.boardContainer.backgroundColor = new Color(0, 0, 0, 0);
        this.boardContainer.scrollsHorizontally = true;
        this.boardContainer.scrollsVertically = false;
        this.addSubview(this.boardContainer);

        // Add some test boards
        for (let i = 0; i < 10; i++) {
            let board = new Board(`Board ${i + 1}`);
            this.boardContainer.addSubview(board);
            this.boards.push(board);
        }
    }


    public appearanceChanged(appearance: Appearance): void {
        super.appearanceChanged(appearance);

        // Set background
        this.backgroundColor = appearance.backgroundColor;
    }

    public layout(): void {
        super.layout();

        // Resize the board container
        this.boardContainer.rect = this.rect.bounds;
        this.boardContainer.contentSize.height = this.boardContainer.rect.height;

        // Layout the boards
        let xShift = this.appearance.spacing;
        for (let board of this.boards) {
            // Resize the board
            board.resizeBoard();

            // Position the board
            board.rect.point = new Point(xShift, this.appearance.spacing);

            // Add to xShift
            xShift += board.rect.width + this.appearance.spacing;
        }

        // Resize the board container
        this.boardContainer.contentSize.width = this.boards[this.boards.length - 1].rect.maxX + this.appearance.spacing;
    }
}
