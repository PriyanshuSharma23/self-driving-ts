import { Controller } from "../controller";
import { Vector } from "../utils";
import { Sensor } from "./sensor";

export class Car {
  private x: number;
  private y: number;
  private rotation: number = 0;

  private width: number;
  private height: number;

  private color = "#0000FF";
  private controller: Controller;

  private speed = 0;
  private turn_speed = 0.1;
  private acceleration = 0.2;
  private friction = 0.01;
  sensor: Sensor;

  public getRotation(): number {
    return this.rotation;
  }

  //   define getters for x and y
  public getX(): number {
    return this.x;
  }
  public getY(): number {
    return this.y;
  }

  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;

    this.width = width;
    this.height = height;

    this.controller = new Controller();
    this.sensor = new Sensor(this);
  }

  draw(ctx: CanvasRenderingContext2D) {
    // draw a rectangle
    ctx.save();

    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);

    ctx.fillStyle = this.color;
    ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);

    ctx.restore();

    this.sensor.draw(ctx);
  }

  update(roadBorder: Vector[]) {
    this.moveCar();
    this.sensor.update(roadBorder);
  }

  private moveCar() {
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

    if (this.speed < -5) {
      this.speed = -5;
    }

    if (this.speed > 10) {
      this.speed = 10;
    }

    // apply friction
    this.speed *= 1 - this.friction;

    if (Math.abs(this.speed) < this.friction) {
      this.speed = 0;
    }

    // update the car's position
    this.x += this.speed * Math.sin(this.rotation);
    this.y -= this.speed * Math.cos(this.rotation);
  }
}
