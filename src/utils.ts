export const infinity = 10000000;

// export function intersection(
//   A: Point,
//   B: Point,
//   C: Point,
//   D: Point
// ): { point: Point; offset: number } | null {
//   let ab: Line = new Line(B, A);
//   let cd: Line = new Line(D, C);

//   let denom = vectorProduct(ab, cd);

//   if (denom == 0) {
//     return null;
//   }

//   let ca: Line = new Line(A, C);
//   let t = -vectorProduct(cd, ca) / denom;

//   if (t <= 0 || t >= 1) {
//     return null;
//   }
//   console.log(t);

//   let p: Point = new Point(A.x + (B.x - A.x) * t, A.y + (B.y - A.y) * t);

//   return {
//     point: p,
//     offset: t,
//   };
// }

// function vectorProduct(l1: Line, l2: Line): number {
//   return (
//     (l1.p2.x - l1.p1.x) * (l2.p2.y - l2.p1.y) -
//     (l1.p2.y - l1.p1.y) * (l2.p2.x - l2.p1.x)
//   );
// }
export function intersection(A: Point, B: Point, C: Point, D: Point): { point: Point; offset: number } | null {
  const tTop = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x);
  const uTop = (C.y - A.y) * (A.x - B.x) - (C.x - A.x) * (A.y - B.y);
  const bottom = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y);

  if (bottom != 0) {
    const t = tTop / bottom;
    const u = uTop / bottom;
    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
      return {
        point: {
            x: lerp(A.x, B.x, t),
            y: lerp(A.y, B.y, t),
        },
        offset: t,
      };
    }
  }

  return null;
}


export function lerp(A: number, B: number, t: number): number {
  return A + (B - A) * t;
}


export class Point {
    x: number;
    y: number;
    
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

// vector with 2 points
export class Vector {
    p1: Point;
    p2: Point;
    
    constructor(p1: Point, p2: Point) {
        this.p1 = p1;
        this.p2 = p2;
    }
    
    sub(v: Vector): Vector {
        return new Vector(
            new Point(this.p1.x - v.p1.x, this.p1.y - v.p1.y),
            new Point(this.p2.x - v.p2.x, this.p2.y - v.p2.y)
        );
    }

    add(v: Vector): Vector {
        return new Vector(
            new Point(this.p1.x + v.p1.x, this.p1.y + v.p1.y),
            new Point(this.p2.x + v.p2.x, this.p2.y + v.p2.y)
        );
    }

    mul(n: number): Vector {
        return new Vector(
            new Point(this.p1.x * n, this.p1.y * n),
            new Point(this.p2.x * n, this.p2.y * n)
        );
    }

    length(): number {
        return Math.sqrt(
            Math.pow(this.p2.x - this.p1.x, 2) +
            Math.pow(this.p2.y - this.p1.y, 2)
        );
    }

    normalize(): Vector {
        return this.mul(1 / this.length());
    }

    dot(v: Vector): number {
        return (
            (this.p2.x - this.p1.x) * (v.p2.x - v.p1.x) +
            (this.p2.y - this.p1.y) * (v.p2.y - v.p1.y)
        );
    }

    cross(v: Vector): number {
        return (
            (this.p2.x - this.p1.x) * (v.p2.y - v.p1.y) -
            (this.p2.y - this.p1.y) * (v.p2.x - v.p1.x)
        );
    }

    draw (ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.moveTo(this.p1.x, this.p1.y);
        ctx.lineTo(this.p2.x, this.p2.y);
        ctx.stroke();
    }

}

export function polyIntersect(poly1: Point[], poly2: Point[]) {
  for (let i = 0; i < poly1.length; i++) {
    for (let j = 0; j < poly2.length; j++) {
      const touch = intersection(
        poly1[i],
        poly1[(i + 1) % poly1.length],
        poly2[j],
        poly2[(j + 1) % poly2.length]
      );
      if (touch) {
        return true;
      }
    }
  }
  return false;
}