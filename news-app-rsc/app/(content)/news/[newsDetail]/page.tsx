import { getNewsItem } from "@/_lib/newsDB";
import newsDummyData from "@/_lib/newsDummy";
import { get } from "http";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

const NewsDetail = async ({
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
    <article className="news-article">
      <header>
        <Link href={`/news/${newsSlug}/image`}>
          <img src={`/images/news/${newsItem?.image}`} alt={newsItem?.title} />
        </Link>
        <h1>{newsItem?.title}</h1>
        <time dateTime={newsItem?.date}>{newsItem?.date}</time>
      </header>
      <p>{newsItem?.content}</p>
    </article>
  );
};

export default NewsDetail;
