import { carProps } from "./game-settings";
import { Car } from "./GameObjects/car";
import { Road } from "./Road";

// setting canvas
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
canvas.width = 400;
canvas.height = window.innerHeight;

// add a resize event listener
window.addEventListener("resize", () => {
  canvas.height = window.innerHeight;
});

// setting 2D context
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

// defining global variables
const road = new Road(canvas.width / 2, canvas.width * 0.80);
const car = new Car(
  road.getLaneCenter(),
  carProps.y,
  carProps.width,
  carProps.height
);

function animate() {
  // transform canvas with car

  ctx.save();
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.translate(0, -car.getY() + (2 * canvas.height) / 3);

  road.draw(ctx);

  car.update(road.roadBorder);
  car.draw(ctx);

  ctx.restore();

  requestAnimationFrame(animate);
}

animate();

export {};
