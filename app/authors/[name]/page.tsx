import React from "react";
type AuthorPageProps = {
  params: Promise<{
    name: string;
  }>;
};
const AuthorPage = async ({ params }: AuthorPageProps) => {
  const { name } = await params;
  return <div>{name}</div>;
};

export default AuthorPage;
