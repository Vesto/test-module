import { WebSocket, TextField, Button, Label, Logger, Timer } from "quark";
import { Demo } from "./Demo";

export class WebSocketDemo extends Demo {
    public socket?: WebSocket;

    public url: TextField;
    public connect: Button;
    public state: Label;

    public output: Label;
    public sendField: TextField;
    public sendButton: Button;

    public constructor() {
        super();

        let socket = new WebSocket("ws://echo.websocket.org");

        socket.onOpen = (socket) => {
            Logger.print("Socket open", socket);
        };

        socket.onError = (socket, error) => {
            Logger.print("Socket error", socket, error);
        };

        socket.onClose = (socket, code, reason) => {
            Logger.print("Socket close", socket, code, reason);
        };

        socket.onMessage = (socket, data) => {
            // Logger.print("Socket message", socket, data);
        };

        function sendSomething() {
            // Logger.print("Socket state", socket.state);
            if (socket.state === WebSocket.State.Open) {
                let sendData = Math.random().toString();
                socket.send(sendData);
                // Logger.print("Socket sent", sendData);
            }
        }

        let timer = new Timer(1.0, sendSomething);
        timer.repeats = true;
        timer.start();
    }
}