export const climates: { label: string; value: string }[] = [
  {
    value: "tropical",
    label: "Tropical"
  },
  {
    value: "temperate",
    label: "Temperate"
  },
  {
    value: "dry",
    label: "Dry"
  },
  {
    value: "humid",
    label: "Humid"
  },
  {
    value: "subtropical",
    label: "Subtropical"
  },
  {
    value: "continental",
    label: "Continental"
  }
];

export const lights: { label: string; value: string }[] = [
  {
    value: "direct",
    label: "Direct"
  },
  {
    value: "partial",
    label: "Partial"
  },
  {
    value: "indirect",
    label: "Indirect"
  },
  {
    value: "shade",
    label: "Shade"
  }
];

export const categories: { label: string; value: string }[] = [
  { label: "Aroids (Tropical Foliage)", value: "tropical-foliage" },
  { label: "Succulents", value: "succulents" },
  { label: "Cactus", value: "cactus" },
  { label: "Ferns & Mosses", value: "ferns-mosses" },
  { label: "Indoor Trees & Ficus", value: "indoor-trees" },
  { label: "Palms & Cane Plants", value: "palms-cane" },
  { label: "Flowering Plants", value: "flowering" },
  { label: "Low-Light Plants", value: "low-light" },
  { label: "Other", value: "other" }
];

export const actionButtons: {
  key: "last_water" | "last_rotated" | "last_skipped";
  value: "watered" | "rotated" | "skipped";
  text: { complete: string; idle: string};
  taskKey: "wateredToday" | "rotatedToday" | "skippedToday";
}[] = [
  {
    key: "last_water",
    value: "watered",
    text: { complete: "Watered", idle: "Water" },
    taskKey: "wateredToday"
  },
  {
    key: "last_rotated",
    value: "rotated",
    text: { complete: "Rotated", idle: "Rotate" },
    taskKey: "rotatedToday"
  },
  {
    key: "last_skipped",
    value: "skipped",
    text: { complete: "Skipped", idle: "Skip" },
    taskKey: "skippedToday"
  }
];

export const healthStatuses: {
  label: string;
  value: string;
  description: string;
}[] = [
  {
    label: "Healthy",
    value: "healthy",
    description: "Plant is in excellent condition with vigorous growth"
  },
  {
    label: "Okay",
    value: "okay",
    description: "Plant is stable but may need attention or care adjustments"
  },
  {
    label: "Dying",
    value: "dying",
    description: "Plant is in poor condition and requires immediate care"
  }
];

export const defaultSliderPlants: { name: string; origin: string }[] = [
  {
    name: "Snake Plant",
    origin: "West Africa"
  },
  {
    name: "Peace Lily",
    origin: "West Africa"
  },
  {
    name: "Golden Pothos",
    origin: "West Africa"
  },
  {
    name: "Fiddle Leaf Fig",
    origin: "West Africa"
  }
];

export const navLinks: {
  name: string;
  to: string;
  attributes?: { [key: string]: string };
}[] = [
  {
    name: "Demo Plants",
    to: "/plants"
  },
  {
    name: "Explore Plants",
    to: "/explore"
  },
  {
    name: "Sign up",
    to: "/register",
    attributes: {
      end: ""
    }
  },
  {
    name: "Add Plants",
    to: "/add",
    attributes: {
      end: ""
    }
  },
  {
    name: "Source Code",
    to: "https://github.com/JC-MT/Plantasync",
    attributes: {
      target: "_blank",
      rel: "noopener noreferrer",
      "aria-label": "GitHub repository for Plantasync",
      end: ""
    }
  }
];

export const FILTERED_PLANT_INCREMENT = 10;

export const LOCAL_STORAGE_EXPIRATION_MS = 1000 * 60 * 10;

export const ACTION_PAGINATION_INCREMENT = 5;

