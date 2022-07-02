import { carProps } from "../game-settings";
import { Point, Vector } from "../utils";

export class BaseCar {
  protected x: number;
  protected y: number;
  protected rotation: number = 0;

  protected width: number;
  protected height: number;

  protected color = "#0000FF";

  protected speed = 0;
  protected turn_speed = 0.1;
  protected acceleration = 0.2;
  protected friction = 0.01;
  protected carShape: Point[];

  protected maxSpeed = 10;
  protected minSpeed = -5;

  public getRotation(): number {
    return this.rotation;
  }

  get getCarShape(): Point[] {
    return this.carShape;
  }

  //   define getters for x and y
  public getX(): number {
    return this.x;
  }

  public getY(): number {
    return this.y;
  }

  constructor(
    x: number,
    y: number,
    width: number = carProps.width,
    height: number = carProps.height
  ) {
    this.x = x;
    this.y = y;

    this.width = width;
    this.height = height;

    this.carShape = this.createPolygon();
  }

  private createPolygon(): Point[] {
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

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.moveTo(this.carShape[0].x, this.carShape[0].y);
    for (let i = 1; i < this.carShape.length; i++) {
      ctx.lineTo(this.carShape[i].x, this.carShape[i].y);
    }
    ctx.closePath();
    ctx.fill();
  }

  public update(roadBorder: Vector[]): void {
    this.carShape = this.createPolygon();
  }
  protected moveCar(): void {
    if (this.speed < this.minSpeed) {
      this.speed = this.minSpeed;
    }

    if (this.speed > this.maxSpeed) {
      this.speed = this.maxSpeed;
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
