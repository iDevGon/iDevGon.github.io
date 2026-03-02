const BASE_URL = 'https://idevgon.github.io';

export function resolveImageUrl(src: string, forMeta = false): string {
  if (src.startsWith('http://') || src.startsWith('https://')) return src;
  if (forMeta) return `${BASE_URL}${src}`;
  return src;
}
