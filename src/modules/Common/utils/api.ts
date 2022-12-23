export default function addAPIKey(
  query: Record<string, string>
): Record<string, string> {
  query.api_key = process.env.API_KEY || "";
  return query;
}
