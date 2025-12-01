export function includesTerm(word: string, searchTerm: string) {
  return word.toLowerCase().includes(searchTerm.toLowerCase());
}

export function capitalizeFirstLetters(words: string) {
  return words
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function getGeneralWateringInterval(plantType: string) {
  const formattedType = plantType?.toLowerCase();
  if (!formattedType) return 8;

  return formattedType?.includes("succulent") ||
    formattedType?.includes("cactus")
    ? 15
    : 8;
}

export function getDaysSinceLastAction(lastActionDate: Date) {
  const now = new Date();
  const lastTime = new Date(lastActionDate);
  return Math.floor(
    (now.getTime() - lastTime.getTime()) / (1000 * 60 * 60 * 24)
  );
}

export function isReadyForWatering(plantType: string, lastWateredDate: Date) {
  const daysSinceLastWatered = getDaysSinceLastAction(lastWateredDate);
  const plantNeedsWatering =
    daysSinceLastWatered >= getGeneralWateringInterval(plantType);

  return {
    plantNeedsWatering,
    nextWateringInDays: plantNeedsWatering
      ? 0
      : getGeneralWateringInterval(plantType) - daysSinceLastWatered,
    pastDue: plantNeedsWatering
      ? daysSinceLastWatered - getGeneralWateringInterval(plantType)
      : 0
  };
}

export function formatDateToInputValue(date: Date) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  const year = date.getFullYear();
  const day = String(date.getDate()).padStart(2, "0");
  return `${months[date.getMonth()]} ${day}, ${year}`;
}
