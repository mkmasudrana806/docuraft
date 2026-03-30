export type TDocumentMeta = {
  id: string;
  title: string;
  date: string;
  parent: string | null;
  order: number;
  author: string;
  category: string;
  tags: string[];
};

export type THeaderProps = {
  docs: TDocumentMeta[];
};
