type DataResult<T> = { data: T };
type ErrorResult = { error: string };
export type FetchResult<T> = DataResult<T> | ErrorResult;

export function isError<T>(
  response: FetchResult<T>
): response is { error: string } {
  return "error" in response;
}

export async function fetchFrom<T>(url: string): Promise<T> {
  const response = await fetch(url);
  const result = await response.json();
  if (isError(result)) {
    throw result.error;
  }
  return result.data;
}
