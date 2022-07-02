import { intersection, lerp, Point, Vector } from "../utils";
import { DummyCar } from "./dummy-car";
import { UserControllableCar } from "./user-controllable-car";

export class UserControllableCarSensor {
  private rayColor = "#FFFF00";
  private rayWidth = 2;
  private rayCount = 5;
  private raySpread = Math.PI / 2;
  private rayLength = 200;
  private car;
  private rays: Vector[] = [];
  private readings: Array<Point | null> = [];

  constructor(car: UserControllableCar) {
    this.car = car;
  }

  update(roadBorder: Vector[], traffic: DummyCar[]) {
    this.castRays();

    this.readings = [];
    for (let i = 0; i < this.rays.length; i++) {
      this.readings.push(this.getReading(this.rays[i], roadBorder, traffic));
    }


  }

  draw(ctx: CanvasRenderingContext2D) {
    for (let i = 0; i < this.rayCount; i++) {
      let end = this.rays[i].p2;
      let p = this.readings[i];

      if (p) {
        end = p;
      }

      ctx.beginPath();

      ctx.lineWidth = this.rayWidth;
      ctx.strokeStyle = this.rayColor;
      ctx.setLineDash([]);

      ctx.moveTo(this.rays[i].p1.x, this.rays[i].p1.y);
      ctx.lineTo(end.x, end.y);

      ctx.stroke();

      ctx.beginPath();

      ctx.lineWidth = this.rayWidth;
      ctx.strokeStyle = "black";
      ctx.setLineDash([]);

      ctx.moveTo(this.rays[i].p2.x, this.rays[i].p2.y);
      ctx.lineTo(end.x, end.y);

      ctx.stroke();
    }
  }
  private castRays() {
    this.rays = [];

    for (let i = 0; i < this.rayCount; i++) {
      let angle =
        this.car.getRotation() +
        lerp(
          -this.raySpread / 2,
          this.raySpread / 2,
          this.rayCount == 1 ? 0.5 : i / (this.rayCount - 1)
        );

      const l: Vector = new Vector(
        new Point(this.car.getX(), this.car.getY()),
        new Point(
          this.car.getX() + Math.sin(angle) * this.rayLength,
          this.car.getY() - Math.cos(angle) * this.rayLength
        )
      );

      this.rays.push(l);
    }
  }

  private getReading(l: Vector, roadBorder: Vector[], traffic: DummyCar[]): Point | null {
    const touches: { point: Point; offset: number }[] = [];

    roadBorder.forEach((b) => {
      const p = intersection(l.p1, l.p2, b.p1, b.p2);
      if (p) {
        touches.push(p);
      }
    });


    traffic.forEach(car => {
      car.getCarShape.forEach((p, i) => {
        const p2 = car.getCarShape[i + 1] || car.getCarShape[0]; 

        const p3 = intersection(l.p1, l.p2, p, p2);

        if (p3) {
          touches.push(p3);
        }
      })
    })

    if (touches.length === 0) {
      return null;
    }

    const closest = touches.reduce((a, b) => {
      return a.offset < b.offset ? a : b;
    });

    return closest.point;
  }
}



// export class Sensor {
//   private rayColor = "#FFFF00";
//   private rayWidth = 2;
//   private rayCount = 5;
//   private raySpread = Math.PI / 2;
//   private rayLength = 200;
//   private car;
//   private rays: Vector[] = [];
//   private readings: Array<Point | null> = [];

//   constructor(car: Car) {
//     this.car = car;
//   }

//   update(roadBorder: Vector[]) {
//     this.castRays();

//     this.readings = [];
//     for (let i = 0; i < this.rays.length; i++) {
//       this.readings.push(this.getReading(this.rays[i], roadBorder));
//     }
//   }

//   draw(ctx: CanvasRenderingContext2D) {
    
//     for (let i = 0; i < this.rayCount; i++) {
//       let end = this.rays[i].p2;
//       let p = this.readings[i];
      
//       if (p) {
//         end = p;
//       }

//       ctx.beginPath();
      
//       ctx.lineWidth = this.rayWidth;
//       ctx.strokeStyle = this.rayColor;
//       ctx.setLineDash([]);

//       ctx.moveTo(this.rays[i].p1.x, this.rays[i].p1.y);
//       ctx.lineTo(end.x, end.y);

//       ctx.stroke();


//       ctx.beginPath();

//       ctx.lineWidth = this.rayWidth;
//       ctx.strokeStyle = "black";
//       ctx.setLineDash([]);

//       ctx.moveTo(this.rays[i].p2.x, this.rays[i].p2.y);
//       ctx.lineTo(end.x, end.y);

//       ctx.stroke();

//     }
//   }
//   private castRays() {
//     this.rays = [];

//     for (let i = 0; i < this.rayCount; i++) {
//       let angle =
//         this.car.getRotation() +
//         lerp(
//           -this.raySpread / 2,
//           this.raySpread / 2,
//           this.rayCount == 1 ? 0.5 : i / (this.rayCount - 1)
//         );

//       const l: Vector = new Vector(
//         new Point(this.car.getX(), this.car.getY()),
//         new Point(
//           this.car.getX() + Math.sin(angle) * this.rayLength,
//           this.car.getY() - Math.cos(angle) * this.rayLength
//         )
//       );

//       this.rays.push(l);
//     }
//   }

//   private getReading(l: Vector, roadBorder: Vector[]): Point | null {
//     const touches: { point: Point; offset: number }[] = [];

//     roadBorder.forEach((b) => {
//       const p = intersection(l.p1, l.p2, b.p1, b.p2);
//       if (p) {
//         touches.push(p);
//       }
//     });

//     if (touches.length === 0) {
//       return null;
//     }

//     const closest = touches.reduce((a, b) => {
//       return a.offset < b.offset ? a : b;
//     });

//     return closest.point;
//   }
// }
// 
