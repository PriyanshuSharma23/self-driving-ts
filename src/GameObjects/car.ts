import { Controller } from "../controller";
import { Point, Vector, polyIntersect } from "../utils";
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
  private carShape: Point[];

  private isDamaged: boolean = false;

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

    this.carShape = this.createPolygon();
  }

  draw(ctx: CanvasRenderingContext2D) {

    if (!this.isDamaged) {
      ctx.fillStyle = this.color;
    } else {
      ctx.fillStyle = "#FF0000";
    }
    
    ctx.beginPath();
    ctx.moveTo(this.carShape[0].x, this.carShape[0].y);
    for (let i = 1; i < this.carShape.length; i++) {
      ctx.lineTo(this.carShape[i].x, this.carShape[i].y);
    }
    ctx.closePath();
    ctx.fill();

    this.sensor.draw(ctx);
  }

  update(roadBorder: Vector[]) {
    if (!this.isDamaged) {
      this.moveCar();
      this.carShape = this.createPolygon();
      this.isDamaged = this.assessDamage(roadBorder);
    }

    this.sensor.update(roadBorder);
  }

  private assessDamage(roadBorder: Vector[]): boolean {
    for (let i = 0; i < roadBorder.length; i++) {
      let roadBorderPoints = [
        new Point(roadBorder[i].p1.x, roadBorder[i].p1.y),
        new Point(roadBorder[i].p2.x, roadBorder[i].p2.y),
      ];
      if (polyIntersect(this.carShape, roadBorderPoints)) {
        return true;
      }
    }

    return false;
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

  private createPolygon() {
    let rad = Math.hypot(this.width, this.height) / 2;
    let alpha = Math.atan2(this.width, this.height);

    let points = [];

    points.push(
      new Point(
        this.x - rad * Math.sin(-this.rotation - alpha),
        this.y - rad * Math.cos(-this.rotation - alpha)
      )
    );

    points.push(
      new Point(
        this.x - rad * Math.sin(-this.rotation + alpha),
        this.y - rad * Math.cos(-this.rotation + alpha)
      )
    );

    points.push(
      new Point(
        this.x - rad * Math.sin(Math.PI - this.rotation - alpha),
        this.y - rad * Math.cos(Math.PI - this.rotation - alpha)
      )
    );

    points.push(
      new Point(
        this.x - rad * Math.sin(Math.PI - this.rotation + alpha),
        this.y - rad * Math.cos(Math.PI - this.rotation + alpha)
      )
    );

    return points;
  }
}
