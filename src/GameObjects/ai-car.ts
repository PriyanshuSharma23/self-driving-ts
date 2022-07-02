import { NeuralNetwork } from "../NeuralNetwork/network";
import { Vector } from "../utils";
import { DummyCar } from "./dummy-car";
import { UserControllableCar } from "./user-controllable-car";

export class AiCar extends UserControllableCar {
    neuralNetwork: NeuralNetwork;

    constructor(x: number, y: number, width: number, height: number) {
        super(x, y, width, height);
        this.neuralNetwork = new NeuralNetwork([this.sensor.getRayCount, 6, 4]);
    }

    public customUpdate(roadBorder: Vector[], traffic: DummyCar[]): void {
        super.customUpdate(roadBorder, traffic);
        const offsets = this.sensor.getOffsets.map(r => r ? 1 - r : 0) 

        const outputs = NeuralNetwork.feedForward(offsets, this.neuralNetwork);

        this.controller.upKey = Boolean(outputs[0]);
        this.controller.leftKey = Boolean(outputs[1]);
        this.controller.rightKey = Boolean(outputs[2]);
        this.controller.downKey = Boolean(outputs[3]);
    }

} 