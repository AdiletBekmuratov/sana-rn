const grads: {
  [key in Grads]: string[];
} = {
  blue: ["#3BB6DFCC", "#3A9CE8CC"],
  orange: ["#FFD121", "#FFA21A"],
  green: ["#6ACE03", "#09B817"],
  red: ["#F16183", "#FE5C57"],
  red_orange: ["#E95C65", "#FFB512"],
  gold: ["#FDED65", "#FFD709"],
  silver: ["#D6E3ED", "#C2D2E1"],
  bronze: ["#FBBF86", "#E3AF81"],
};

export default grads;

export type Grads =
  | "blue"
  | "orange"
  | "green"
  | "red"
  | "red_orange"
  | "gold"
  | "silver"
  | "bronze";
