import { TDocumentMeta } from "@/interface";

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

/**
 * ---------- get document by author name -----------
 *
 * @param docs Original documents array
 * @param author author name
 * @returns filtered docs
 */
export const getDocumentsByAuthor = (docs: TDocumentMeta[], author: string) => {
  return docs.filter((doc) => doc.author === author);
};

/**
 * ---------- get document by category name -----------
 *
 * @param docs Original documents array
 * @param category category name
 * @returns filtered docs
 */
export const getDocumentsByCategory = (
  docs: TDocumentMeta[],
  category: string,
) => {
  return docs.filter((doc) => doc.category === category);
};

/**
 * ---------- get document by tag name -----------
 *
 * @param docs Original documents array
 * @param tag tag name
 * @returns filtered docs
 */
export const getDocumentsByTags = (docs: TDocumentMeta[], tag: string) => {
  return docs.filter((doc) => doc.tags.includes(tag));
};
