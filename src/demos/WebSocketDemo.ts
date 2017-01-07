import { WebSocket, TextField, Button, Label, Appearance, Constraint, LabelStyle, TextVerticalAlignmentMode, TextAlignmentMode } from "quark";
import { Demo } from "./Demo";

export class WebSocketDemo extends Demo {
    public socket?: WebSocket;

    public addressField: TextField;
    public connectButton: Button;
    public state: Label;

    public output: Label;

    public sendField: TextField;
    public sendButton: Button;

    public controlHeightConstraint: Constraint;

    public constructor() {
        super();

        // Create controls
        this.addressField = new TextField();
        this.addressField.text = "ws://echo.websocket.org";
        this.addSubview(this.addressField);

        this.connectButton = new Button();
        this.connectButton.onButtonUp = () => this.connect();
        this.addSubview(this.connectButton);

        this.state = new Label();
        this.state.style = LabelStyle.Text;
        this.state.alignmentMode = TextAlignmentMode.Center;
        this.addSubview(this.state);

        this.output = new Label();
        this.output.style = LabelStyle.Text;
        this.output.verticalAlignmentMode = TextVerticalAlignmentMode.Bottom;
        this.addSubview(this.output);

        this.sendField = new TextField();
        this.addSubview(this.sendField);

        this.sendButton = new Button();
        this.sendButton.isEmphasized = true;
        this.sendButton.title = "Send";
        this.sendButton.onButtonUp = () => this.send();
        this.addSubview(this.sendButton);

        // Update the state
        this.updateState();

        // Add constraints
        this.useAutoLayout = true;
        this.controlHeightConstraint = new Constraint(
            this.addressField, Constraint.Attribute.Height, Constraint.Relation.Equal,
            undefined, Constraint.Attribute.Constant,
            1, 0, 1
        );
        this.addConstraint(this.controlHeightConstraint);
        this.addConstraints(Constraint.fromVFL(
            [
                // Make output be a certain width
                "|~[output(<=500)]~|",
                "V:|-[address,connect(address),state(address)]-[output]-[text(address),send(text)]-|",

                // Make address and connect spaced, connect be 100 width
                "[address]-[connect(100)]-[state(50)]",

                // Same
                "[text]-[send(100)]",

                // Align address and connect to output
                "C:address.left(output.left)",
                "C:state.right(output.right)",

                // Same
                "C:text.left(output.left)",
                "C:send.right(output.right)"
            ],
            {
                address: this.addressField,
                connect: this.connectButton,
                state: this.state,
                output: this.output,
                text: this.sendField,
                send: this.sendButton
            }
        ));
    }

    public appearanceChanged(appearance: Appearance): void {
        super.appearanceChanged(appearance);

        this.state.textColor = appearance.primaryColor;
        this.output.textColor = appearance.primaryColor;

        this.controlHeightConstraint.constant = appearance.controlSize;
        this.applyConstraints();
    }

    public connect(): void {
        if (this.socket && this.socket.state !== WebSocket.State.Closed) {
            // Close the socket
            this.socket.close();
            this.updateState();
        } else {
            // Create a new socket
            this.createSocket(this.addressField.text);
        }
    }

    public createSocket(address: string): void {
        this.socket = new WebSocket(address);

        this.socket.onOpen = (socket) => {
            this.printMessage("Opened");
            this.updateState();
        };

        this.socket.onError = (socket, error) => {
            this.printMessage(`Error:\n${error}`);
            this.updateState();
        };

        this.socket.onClose = (socket, code, reason) => {
            this.printMessage("Closed");
            this.updateState();
        };

        this.socket.onMessage = (socket, data) => {
            this.printMessage(`Received: ${data.toString()}`);
        };

        this.updateState();
    }

    public send(): void {
        if (this.socket) {
            let sendData = this.sendField.text;
            this.socket.send(sendData);
            this.printMessage(`Sent: ${sendData}`);
            this.sendField.text = "";
        }
    }

    public printMessage(message: string): void {
        this.output.text += `\n${message}`;
    }

    public updateState() {
        // Set default values
        this.connectButton.title = "Connect";
        this.state.text = "N/A";
        this.sendButton.isEnabled = false;

        if (this.socket) {
            // Set default if there is a socket
            this.connectButton.title = "Disconnect";
            switch (this.socket.state) {
                case WebSocket.State.Connecting:
                    this.state.text = "Connecting";
                    break;
                case WebSocket.State.Open:
                    this.state.text = "Open";
                    this.sendButton.isEnabled = true;
                    break;
                case WebSocket.State.Closing:
                    this.state.text = "Closing";
                    break;
                case WebSocket.State.Closed:
                    this.state.text = "Closed";
                    this.connectButton.title = "Connect";
                    break;
            }
        }
    }
}