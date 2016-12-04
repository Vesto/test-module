import { View, ModuleDelegate, ToolbarItem, Action, Window } from "quark";
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
}
