import { View, ModuleDelegate, ToolbarItem, Action, Window, KeyEvent, Logger } from "quark";
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


    public keyEvent(event: KeyEvent): boolean {
        Logger.print(`Unhandled key event. ${event.keyCode}`);
        return true
    }
}
