import React from "react";

type Props = {
  params: {
    subContentId: string;
  };
};

const SubContentPage = ({ params }: Props) => {
  return <div>{params.subContentId}</div>;
};

export default SubContentPage;
