import Link from "next/link";
import React from "react";
import { NewsDummyData } from "./newsGrid";

const NewsItem = ({ newsItem }: { newsItem: NewsDummyData }) => {
  return (
    <Link href={`/news/${newsItem.slug}`}>
      <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
      <span>{newsItem.title}</span>
    </Link>
  );
};

export default NewsItem;
