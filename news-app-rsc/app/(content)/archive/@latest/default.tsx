// page.tsx has been deleted as the content of page.tsx and default.tsx are the same

import { getLatestNews } from "@/_lib/newsDB";
import NewsGrid from "@/component/news/newsGrid";
import React from "react";

const LatestNewsPage: React.FC = async () => {
  const latestNews = await getLatestNews();

  return (
    <>
      <h2>Latest News</h2>
      <NewsGrid newsDummyData={latestNews} />
    </>
  );
};

export default LatestNewsPage;
