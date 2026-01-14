export function includesTerm(word: string, searchTerm: string) {
  return word.toLowerCase().includes(searchTerm.toLowerCase());
}

export function capitalizeFirstLetters(words: string) {
  return words
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function getGeneralWateringInterval(
  plantType: string,
  customSchedule: number
) {
  if (customSchedule) return customSchedule;

  const formattedType = plantType?.toLowerCase();
  if (!formattedType) return 8;

  return formattedType?.includes("succulent") ||
    formattedType?.includes("cactus")
    ? 15
    : 8;
}

export function getDaysSinceLastAction(lastActionDate: string) {
  const now = new Date();
  const lastTime = new Date(lastActionDate);
  return Math.floor(
    (now.getTime() - lastTime.getTime()) / (1000 * 60 * 60 * 24)
  );
}

export function isReadyForWatering(
  plantType: string,
  lastWateredDate: string,
  customSchedule: number
) {
  const daysSinceLastWatered = getDaysSinceLastAction(lastWateredDate);
  const plantNeedsWatering =
    daysSinceLastWatered >=
    getGeneralWateringInterval(plantType, customSchedule);

  return {
    plantNeedsWatering,
    nextWateringInDays: plantNeedsWatering
      ? 0
      : getGeneralWateringInterval(plantType, customSchedule) -
        daysSinceLastWatered,
  };
}

export function convertFormData(rawData: FormData | unknown) {
  return rawData instanceof FormData
    ? Object.fromEntries(rawData.entries())
    : rawData;
}

export function toHex(buffer: ArrayBuffer) {
  return [...new Uint8Array(buffer)]
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

