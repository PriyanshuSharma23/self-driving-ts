import { infinity, Point, Vector } from "./utils";

export const carProps = {
  width: 50,
  height: 80,
  y: 440,
};

export const RoadBorder = (left: number, right: number) => {
  const border = [
    new Vector(new Point(left, infinity), new Point(left, -infinity)),
    new Vector(new Point(right, infinity), new Point(right, -infinity)),
  ];

  return border;
};
