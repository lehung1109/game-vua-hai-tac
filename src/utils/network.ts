/**
 * fetchWithProgress
 */
export async function fetchWithProgress<T>(
  url: string,
  options?: RequestInit,
  onProgress?: (percent: number) => void,
  duration = 5000
): Promise<T> {
  const start = Date.now();

  const fakeInterval = setInterval(() => {
    const elapsed = Date.now() - start;
    const percent = Math.min(elapsed / duration, 0.95); // max 95% if not done
    onProgress?.(percent);
  }, 100);

  // call fetch
  const res = await fetch(url, options);
  const data = await res.json();

  clearInterval(fakeInterval);

  // make progress 100%
  onProgress?.(1);

  return data;
}
