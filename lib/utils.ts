/**
 * ------------ groupBy -------------
 *
 * @param arr iterable array
 * @param getKey key to groupby
 */
type Grouped<T> = Record<string, T[]>;
export const groupBy = <T>(arr: T[], getKey: (item: T) => string) => {
  return arr.reduce((acc, item) => {
    const key = getKey(item);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {} as Grouped<T>);
};
