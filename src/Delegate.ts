import { View, ModuleDelegate, ToolbarItem, Action, Window, KeyEvent, Logger, InteractionEvent } from "quark";
import { RootView } from "./RootView";

export class Delegate implements ModuleDelegate {
    public createActions(): Action[] {
        return [];
    }

    public toolbarItems(actions: Action[]): ToolbarItem[] {
        return [];
    }

    public createInterface(window: Window): void {
        window.rootView = new RootView();
    }

    public interactionEvent(event: InteractionEvent): boolean {
        // Logger.print(`Interaction event ${event.type} ${event.phase}`);
        return true;
    }

    public keyEvent(event: KeyEvent): boolean {
        Logger.print(`Unhandled key event. ${event.keyCode}`);
        return true;
    }
}
