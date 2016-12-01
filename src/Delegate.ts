import { View, ModuleDelegate, ToolbarItem, Action, Window } from "quark";
import { RootView } from "./RootView";

// export * from "quark"; // TEMP: This is so it can be accessed for now. Create a transform for Browserify.

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
