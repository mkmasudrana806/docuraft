import React from "react";

type Props = {
  params: Promise<{
    contentId: string;
    subContentId: string;
  }>;
};

const SubContentPage = async ({ params }: Props) => {
  const { subContentId } = await params;

  return <div>{subContentId}</div>;
};

export default SubContentPage;
