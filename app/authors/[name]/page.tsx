import ContentDisplay from "@/components/ContentDisplay";
import { getDocuments } from "@/lib/doc";
import { getDocumentsByAuthor } from "@/lib/utils";
import React from "react";
type AuthorPageProps = {
  params: Promise<{
    name: string;
  }>;
};

const AuthorPage = async ({ params }: AuthorPageProps) => {
  const { name } = await params;
  const slug = decodeURIComponent(name);
  const docs = getDocuments();
  const filteredDocs = getDocumentsByAuthor(docs, slug);
  return <ContentDisplay id={filteredDocs[0].id} />;
};

export default AuthorPage;
