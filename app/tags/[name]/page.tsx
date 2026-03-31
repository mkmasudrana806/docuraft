import React from "react";
type TagsContentTageProps = {
  params: Promise<{
    name: string;
  }>;
};
const TagsContentTage = async ({ params }: TagsContentTageProps) => {
  const { name } = await params;
  return <div>{name}</div>;
};

export default TagsContentTage;
