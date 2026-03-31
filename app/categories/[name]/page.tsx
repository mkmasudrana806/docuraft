import React from "react";
type CategoriesPageProps = {
  params: Promise<{
    name: string;
  }>;
};
const CategoriesPage = async ({ params }: CategoriesPageProps) => {
  const { name } = await params;
  return <div>{name}</div>;
};

export default CategoriesPage;
