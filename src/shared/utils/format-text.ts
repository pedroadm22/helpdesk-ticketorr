/**
 * Capitalizes the first letter of a string and converts the rest to lowercase.
 * Example: "dEPARtMEnt" -> "Department"
 */
export function capitalizeFirstLetter(text: string): string {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

export function capitalizeWords(text: string): string {
  if (!text) return text;
  return text
    .trim()
    .split(/\s+/)
    .map((word) => capitalizeFirstLetter(word))
    .join(" ");
}