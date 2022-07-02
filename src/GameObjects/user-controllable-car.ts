import { Controller } from "../controller";
import { Point, polyIntersect, Vector } from "../utils";
import { BaseCar } from "./base-car";
import { DummyCar } from "./dummy-car";
import { UserControllableCarSensor } from "./sensor";

export class UserControllableCar extends BaseCar {
  private controller: Controller;
  private sensor: UserControllableCarSensor;

  private isDamaged = false;

  constructor(x: number, y: number, width: number, height: number) {
    super(x, y, width, height);
    this.controller = new Controller();
    this.sensor = new UserControllableCarSensor(this);
  }

  public customUpdate(roadBorder: Vector[], traffic: DummyCar[]): void {
    if (!this.isDamaged) {
      this.moveCar();
      super.update(roadBorder);
      this.sensor.update(roadBorder, traffic);
      this.isDamaged = this.assessDamage(roadBorder, traffic);
    }
    this.sensor.update(roadBorder, traffic);
  }

  private assessDamage(roadBorder: Vector[], traffic: DummyCar[]): boolean {
    for (let i = 0; i < roadBorder.length; i++) {
      let roadBorderPoints = [
        new Point(roadBorder[i].p1.x, roadBorder[i].p1.y),
        new Point(roadBorder[i].p2.x, roadBorder[i].p2.y),
      ];
      if (polyIntersect(this.carShape, roadBorderPoints)) {
        return true;
      }
    }

    for (let i = 0; i < traffic.length; i++) {
        if (polyIntersect(this.carShape, traffic[i].getCarShape)) {
          return true;
        }
    }

    return false;
  }
  public draw(ctx: CanvasRenderingContext2D): void {
    if (this.isDamaged) {
      ctx.fillStyle = "red";
    } else {
      ctx.fillStyle = this.color;
    }

    super.draw(ctx);

    this.sensor.draw(ctx);
  }

  protected moveCar(): void {
    let flip = 1;
    if (this.speed < 0) flip = -1;
    // update the car's rotation
    if (this.controller.leftKey) {
      this.rotation -= flip * this.turn_speed;
    }
    if (this.controller.rightKey) {
      this.rotation += flip * this.turn_speed;
    }

    // update the car's speed
    if (this.controller.upKey) {
      this.speed += this.acceleration;
    }
    if (this.controller.downKey) {
      this.speed -= this.acceleration;
    }

    // update the car's position
    super.moveCar();
  }
}
