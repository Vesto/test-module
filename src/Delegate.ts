import { ModuleDelegate, ToolbarItem, Action, Window, KeyEvent, Logger, InteractionEvent, Module } from "quark";
import { Root } from "./Root";

export class Delegate implements ModuleDelegate {
    public root: Root;

    public constructor() { }

    public createActions(): Action[] {
        return [];
    }

    public toolbarItems(actions: Action[]): ToolbarItem[] {
        return [];
    }

    public createInterface(window: Window): void {
        this.root = new Root();
        window.rootView.addSubview(this.root);
        window.rootView.layout = () => { // TODO: Use a better hack
            this.root.layout();
        }
    }

    public interactionEvent(event: InteractionEvent): boolean {
        // Logger.print(`Interaction event ${event.type} ${event.phase}`);
        return true;
    }
}
