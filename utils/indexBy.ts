export default function _indexBy<T>(
  entries: Array<T>,
  key: keyof T
): Record<string, T> {
  if (!entries) {
    console.warn("Entries are undefined");
    return {};
  }
  let indexed: Record<string, T> = {};
  for (let entry of entries) {
    indexed[entry[key] as string] = entry;
  }
  return indexed;
}
