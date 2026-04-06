import ContentDisplay from "@/components/ContentDisplay";
import { getDocuments } from "@/lib/doc";
import { getDocumentsByCategory } from "@/lib/utils";
import React from "react";
type CategoriesPageProps = {
  params: Promise<{
    name: string;
  }>;
};
const CategoriesPage = async ({ params }: CategoriesPageProps) => {
  const { name } = await params;
  const slug = decodeURIComponent(name);
  const docs = getDocuments();
  const filteredDocs = getDocumentsByCategory(docs, slug);
  return <ContentDisplay id={filteredDocs[0].id} />;
};

export default CategoriesPage;
