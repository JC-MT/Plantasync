export const climates: { label: string; value: string }[] = [
  {
    value: "tropical",
    label: "Tropical",
  },
  {
    value: "temperate",
    label: "Temperate",
  },
  {
    value: "dry",
    label: "Dry",
  },
  {
    value: "humid",
    label: "Humid",
  },
  {
    value: "subtropical",
    label: "Subtropical",
  },
  {
    value: "continental",
    label: "Continental",
  },
];

export const lights: { label: string; value: string }[] = [
  {
    value: "direct",
    label: "Direct",
  },
  {
    value: "partial",
    label: "Partial",
  },
  {
    value: "indirect",
    label: "Indirect",
  },
  {
    value: "shade",
    label: "Shade",
  },
];

export const categories: { label: string; value: string }[] = [
  { label: "Aroids (Tropical Foliage)", value: "Aroids (Tropical Foliage)" },
  { label: "Succulents", value: "Succulents" },
  { label: "Cactus", value: "Cactus" },
  { label: "Ferns & Mosses", value: "Ferns & Mosses" },
  { label: "Indoor Trees & Ficus", value: "Indoor Trees & Ficus" },
  { label: "Palms & Cane Plants", value: "Palms & Cane Plants" },
  { label: "Flowering Plants", value: "Flowering Plants" },
  { label: "Low-Light Plants", value: "Low-Light Plants" },
  { label: "Other", value: "Other" },
];

export const actionButtons: {
  key: "last_water" | "last_rotated" | "last_skipped" | "last_fertilized";
  value: "watered" | "rotated" | "skipped" | "fertilized";
  text: { complete: string; idle: string };
  img: string;
}[] = [
  {
    key: "last_water",
    value: "watered",
    text: { complete: "Watered", idle: "Water" },
    img: "https://cdn-icons-png.flaticon.com/512/2514/2514435.png",
  },
  {
    key: "last_rotated",
    value: "rotated",
    text: { complete: "Rotated", idle: "Rotate" },
    img: "https://cdn-icons-png.flaticon.com/512/545/545682.png",
  },
  {
    key: "last_skipped",
    value: "skipped",
    text: { complete: "Skipped", idle: "Skip" },
    img: "https://cdn-icons-png.flaticon.com/512/2961/2961937.png",
  },
  {
    key: "last_fertilized",
    value: "fertilized",
    text: { complete: "Fertilized", idle: "Fertilize" },
    img: "https://cdn-icons-png.flaticon.com/512/2961/2961937.png",
  },
];

export const healthStatuses: {
  label: string;
  value: string;
  description: string;
}[] = [
  {
    label: "Healthy",
    value: "healthy",
    description: "Plant is in excellent condition with vigorous growth",
  },
  {
    label: "Okay",
    value: "okay",
    description: "Plant is stable but may need attention or care adjustments",
  },
  {
    label: "Dying",
    value: "dying",
    description: "Plant is in poor condition and requires immediate care",
  },
];

export const defaultSliderPlants: { name: string; origin: string }[] = [
  {
    name: "Snake Plant",
    origin: "West Africa",
  },
  {
    name: "Peace Lily",
    origin: "West Africa",
  },
  {
    name: "Golden Pothos",
    origin: "West Africa",
  },
  {
    name: "Fiddle Leaf Fig",
    origin: "West Africa",
  },
];

export const navLinks: {
  name: string;
  to: string;
  attributes?: { [key: string]: string };
}[] = [
  {
    name: "Demo Plants",
    to: "/plants",
  },
  {
    name: "Explore Plants",
    to: "/explore",
  },
  {
    name: "Sign up",
    to: "/register",
    attributes: {
      end: "",
    },
  },
  {
    name: "Add Plants",
    to: "/add",
    attributes: {
      end: "",
    },
  },
  {
    name: "Source Code",
    to: "https://github.com/JC-MT/Plantasync",
    attributes: {
      target: "_blank",
      rel: "noopener noreferrer",
      "aria-label": "GitHub repository for Plantasync",
      end: "",
    },
  },
];

export const FILTERED_PLANT_INCREMENT = 10;

export const LOCAL_STORAGE_EXPIRATION_MS = 1000 * 60 * 10;

export const ACTION_PAGINATION_INCREMENT = 5;
