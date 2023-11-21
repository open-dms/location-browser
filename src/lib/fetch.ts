export type FetchResult<T> = { data: T } | { error: string };

export async function fetchFrom<T>(url: string): Promise<FetchResult<T>> {
  const response = await fetch(url);
  return response.json();
}
