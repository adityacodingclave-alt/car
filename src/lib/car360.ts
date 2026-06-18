import car360Frames from "@/data/car360-frames.json";

const MODEL_NAME_MAP: Record<string, string> = {
  BJ60: "BJ60",
  "BJ40 C": "BJ40 PLUS",
  "BJ40 PRO": "BJ40 PLUS",
  X7: "ALL NEW X7",
  "X55 II": "X55 II",
  X35: "X35",
  "U5 PLUS": "U5 PLUS",
  EU5: "EU5",
};

type Car360Manifest = Record<string, Record<string, string[]>>;

const manifest = car360Frames as Car360Manifest;

export function getCar360Frames(
  modelName: string,
  colorIndex = 0,
): string[] | null {
  const mapped = MODEL_NAME_MAP[modelName] ?? modelName;
  const colors = manifest[mapped];
  if (!colors) return null;

  const colorKey = `color${colorIndex}`;
  const frames = colors[colorKey];
  if (!frames || frames.length !== 36) return null;

  return frames;
}

export function hasCar360(modelName: string): boolean {
  const mapped = MODEL_NAME_MAP[modelName] ?? modelName;
  return Boolean(manifest[mapped]);
}
