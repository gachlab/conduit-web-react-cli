export function fetchTags(
  baseUrl = "https://conduit.productionready.io/api/tags"
) {
  return (input) => fetch(baseUrl).then((response) => response.json());
}
