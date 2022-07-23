import { Grads } from "./grads";

const colors: {
  [key in Colors]: string;
} = {
  blue: "#3BB6DFCC",
  orange: "#FFD121",
  green: "#6ACE03",
  red: "#F16183",
  red_orange: "#E95C65",
};

export default colors;

export type Colors = Exclude<Grads, "gold" | "silver" | "bronze">;
