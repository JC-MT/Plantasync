import { scrypt } from "../../node_modules/@noble/hashes/scrypt";
import {
  randomBytes,
  bytesToHex,
  hexToBytes,
  utf8ToBytes,
} from "../../node_modules/@noble/hashes/utils";

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

export function hashPassword(password: string) {
  if (!password) {
    throw new Error("Cannot create credentials.");
  }

  const salt = randomBytes(16);
  const hash = scryptPassword(password, salt);

  return {
    salt: bytesToHex(salt),
    hash: bytesToHex(hash),
  };
}

export function verifyPassword(
  password: string,
  storedHash: string,
  storedSalt: string
) {
  if (!password || !storedHash || !storedSalt) {
    throw new Error("Cannot confirm credentials.");
  }

  const salt = hexToBytes(storedSalt);
  const expectedHash = hexToBytes(storedHash);

  const hash = scryptPassword(password, salt);

  if (hash.length !== expectedHash.length) return false;

  return crypto.subtle.timingSafeEqual(hash, expectedHash);
}

function scryptPassword(password: string, salt: Uint8Array) {
  const passwordToBytes = utf8ToBytes(password);

  const hash = scrypt(passwordToBytes, salt, {
    N: 2 ** 16,
    r: 8,
    p: 1,
    dkLen: 32,
  });

  return hash;
}
