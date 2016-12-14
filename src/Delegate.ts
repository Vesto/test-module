import { ModuleDelegate, ToolbarItem, Action, Window, KeyEvent, Logger, InteractionEvent, Module } from "quark";
import { RootView } from "./RootView";

export class Delegate implements ModuleDelegate {
    public static window: Window;

    public createActions(): Action[] {
        return [];
    }

    public toolbarItems(actions: Action[]): ToolbarItem[] {
        return [];
    }

    public createInterface(window: Window): void {
        Delegate.window = window;
        window.rootView = new RootView();
    }

    public interactionEvent(event: InteractionEvent): boolean {
        // Logger.print(`Interaction event ${event.type} ${event.phase}`);
        return true;
    }

    public keyEvent(event: KeyEvent): boolean {
        Logger.print(`Unhandled key event. ${event.keyCode}`);
        // See http://apps.timwhitlock.info/unicode/inspect
        (Delegate.window.rootView as RootView).text += String.fromCharCode(0xD83E, 0xDD21);
        (Delegate.window.rootView as RootView).updateLabel();

        return true;
    }
}
