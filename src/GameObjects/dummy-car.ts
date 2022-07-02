import { Vector } from "../utils";
import { BaseCar } from "./base-car";

export class DummyCar extends BaseCar {
    constructor(x: number, y: number, width: number, height: number) {
        super(x, y, width, height);
        this.speed = 2;
        this.maxSpeed = 4
    }

    public update(roadBorder: Vector[]): void {
        this.moveCar()
        super.update(roadBorder);
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = '#00ffff';
        super.draw(ctx);
    }

    protected moveCar(): void {
        this.y -= this.speed;
        this.speed += this.acceleration
        super.moveCar();    
    }
    
}