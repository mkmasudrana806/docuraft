import ContentDisplay from "@/components/ContentDisplay";
import React from "react";

type Props = {
  params: {
    contentId: string;
  };
};

const ContentPage = ({ params }: Props) => {
  return (
    <div>
      <ContentDisplay id={params.contentId} />
    </div>
  );
};

export default ContentPage;
