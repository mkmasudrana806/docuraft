import ContentDisplay from "@/components/ContentDisplay";
import React from "react";

type Props = {
  params: Promise<{
    contentId: string;
  }>;
};

const ContentPage = async ({ params }: Props) => {
  const { contentId } = await params;

  return (
    <div>
      <ContentDisplay id={contentId} />
    </div>
  );
};

export default ContentPage;
