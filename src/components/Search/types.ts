import { SearchResultItem } from "@/lib/osm";

export type SearchResult =
  | { query: string; results: Array<SearchResultItem> }
  | SearchResultItem;

export function hasQuery(
  result: SearchResult
): result is { query: string; results: Array<SearchResultItem> } {
  return "query" in result;
}
