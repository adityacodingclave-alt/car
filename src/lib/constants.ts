export const API_BASE = "https://baicserver.baicuae.com";
export const IMAGE_BASE = `${API_BASE}/uploads/.tmp/`;

export function imageUrl(filename: string): string {
  return `${IMAGE_BASE}${encodeURIComponent(filename)}`;
}
