import { carProps } from "./game-settings";
import { DummyCar } from "./GameObjects/dummy-car";
import { UserControllableCar } from "./GameObjects/user-controllable-car";

import { Road } from "./Road";

// setting canvas
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
canvas.width = 800;
canvas.height = window.innerHeight;

// add a resize event listener
window.addEventListener("resize", () => {
  canvas.height = window.innerHeight;
});

// setting 2D context
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

// defining global variables
const road = new Road(canvas.width / 2, canvas.width * 0.95, 5);
const car = new UserControllableCar(
  road.getLaneCenter(),
  carProps.y,
  carProps.width,
  carProps.height
);
const traffic = [
  new DummyCar( road.getLaneCenter(0), canvas.height / 3, carProps.width, carProps.height),
];

function animate() {
  // transform canvas with car

  ctx.save();
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.translate(0, -car.getY() + (2 * canvas.height) / 3);

  road.draw(ctx);

  traffic.forEach((car) => {
    car.update(road.roadBorder);
    car.draw(ctx);
  })

  car.customUpdate(road.roadBorder, traffic);
  car.draw(ctx);

  ctx.restore();

  requestAnimationFrame(animate);
}

animate();

export {};
