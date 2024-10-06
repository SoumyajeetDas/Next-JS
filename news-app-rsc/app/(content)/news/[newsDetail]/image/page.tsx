import { getNewsItem } from "@/_lib/newsDB";
import newsDummyData from "@/_lib/newsDummy";
import { notFound } from "next/navigation";
import React from "react";

const NewsImage = async ({
  params,
}: {
  params: {
    newsDetail: string;
  };
}) => {
  const newsSlug = params.newsDetail;
  // const newsItem = newsDummyData.find((newsItem) => newsItem.slug === newsSlug);

  const newsItem = await getNewsItem(newsSlug);

  if (!newsItem) return notFound();
  return (
    <div className="fullscreen-image">
      <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
    </div>
  );
};

export default NewsImage;
