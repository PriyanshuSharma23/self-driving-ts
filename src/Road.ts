import { RoadBorder } from "./game-settings";
import { infinity, lerp, Vector } from "./utils";

export class Road {
  x: number;
  width: number;
  left: number;
  right: number;
  laneCount: number;
  roadBorder: Vector[];
  laneWidth: number;

  constructor(x: number, width: number, laneCount: number = 3) {
    this.x = x;
    this.width = width;
    this.left = x - width / 2;
    this.right = x + width / 2;
    this.laneCount = laneCount;

    this.laneWidth = width / laneCount;
    this.roadBorder = RoadBorder(this.left, this.right);
  }

  draw(ctx: CanvasRenderingContext2D) {
    // set stroke color
    ctx.strokeStyle = "#fff";
    // set line width
    ctx.lineWidth = 5;

    ctx.setLineDash([]);
    // draw road border
    this.roadBorder.forEach((line) => {
      ctx.beginPath();
      ctx.moveTo(line.p1.x, line.p1.y);
      ctx.lineTo(line.p2.x, line.p2.y);
      ctx.stroke();
    });

    ctx.setLineDash([30, 40]);
    // draw dashed lines
    for (let i = 1; i < this.laneCount; i++) {
      let x = lerp(this.left, this.right, i / this.laneCount);

      ctx.beginPath();
      ctx.moveTo(x, infinity);
      ctx.lineTo(x, -infinity);
      ctx.stroke();
    }
  }

  getLaneCenter(n?: number) {
    if (n == null) {
        n = Math.floor(this.laneCount / 2)
    }
    if (n >= this.laneCount) n = this.laneCount - 1;

    return this.laneWidth * n + this.laneWidth / 2 + this.left;
  }
}
