import React from "react";
import NewsItem from "./newsItem";
// import newsDummyData from "@/_lib/newsDummy";

export type NewsDummyData = {
  id: string;
  slug: string;
  title: string;
  image: string;
  date: string;
  content: string;
};

const NewsGrid = ({
  newsDummyData,
}: {
  newsDummyData: Readonly<NewsDummyData[]>;
}) => {
  return (
    <>
      <h1 style={{ textAlign: "center" }}>News Page</h1>
      <ul className="news-list">
        {newsDummyData.map((newsItem) => (
          <li key={newsItem.id}>
            <NewsItem newsItem={newsItem} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default NewsGrid;
