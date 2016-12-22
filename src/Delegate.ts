import { ModuleDelegate, ToolbarItem, Action, Window, KeyEvent, Logger, InteractionEvent, Module } from "quark";
import { Root } from "./Root";

export class Delegate implements ModuleDelegate {
    public static window: Window;

    public constructor() {

    }

    public createActions(): Action[] {
        return [];
    }

    public toolbarItems(actions: Action[]): ToolbarItem[] {
        return [];
    }

    public createInterface(window: Window): void {
        Delegate.window = window;
        let root = new Root();
        window.rootView.addSubview(root);
        window.rootView.layout = () => { // TODO: Use a better hack
            root.layout();
        }
    }

    public interactionEvent(event: InteractionEvent): boolean {
        // Logger.print(`Interaction event ${event.type} ${event.phase}`);
        return true;
    }

    public keyEvent(event: KeyEvent): boolean {
        Logger.print(`Unhandled key event. ${event.keyCode}`);
        // See http://apps.timwhitlock.info/unicode/inspect
        (Delegate.window.rootView as Root).text += String.fromCharCode(0xD83E, 0xDD21);
        (Delegate.window.rootView as Root).updateLabel();

        return true;
    }
}
