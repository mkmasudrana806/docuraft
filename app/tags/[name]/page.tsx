import ContentDisplay from "@/components/ContentDisplay";
import { getDocuments } from "@/lib/doc";
import { getDocumentsByTags } from "@/lib/utils";
import React from "react";
type TagsContentTageProps = {
  params: Promise<{
    name: string;
  }>;
};
const TagsContentTage = async ({ params }: TagsContentTageProps) => {
  const { name } = await params;
  const slug = decodeURIComponent(name);
  const docs = getDocuments();
  const filteredDocs = getDocumentsByTags(docs, slug);
  return <ContentDisplay id={filteredDocs[0].id} />;
};

export default TagsContentTage;
