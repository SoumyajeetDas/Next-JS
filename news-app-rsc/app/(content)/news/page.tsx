// import { getAllNews } from "@/_lib/news";
import { getAllNews } from "@/_lib/newsDB";
import NewsGrid, { NewsDummyData } from "@/component/news/newsGrid";
import React from "react";

const page: React.FC = async () => {
  /***************************** Using Dummy Data on the Server ************************************/

  // const news = getAllNews();
  // return <NewsGrid newsDummy={news} />;

  /***************************** Using Client Side Data Fetching ************************************/

  // const [news, setNews] = useState<Readonly<NewsDummyData[]>>([]);
  // const [error, setError] = useState<Error>();
  // const [loading, setLoading] = useState<boolean>(false);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);

  //     const response = await fetch("http://localhost:8080/news");

  //     if (!response.ok) {
  //       setError(new Error("Failed to fetch news"));
  //       setLoading(false);
  //       return;
  //     }

  //     setLoading(false);
  //     const data = (await response.json()) as NewsDummyData[];

  //     setNews(data);

  //     setLoading(false);
  //   };

  //   fetchData();
  // }, []);

  // if (loading) {
  //   return <p>Loading...</p>;
  // } else if (error) {
  //   return <p>Error: {error.message}</p>;
  // } else {
  //   return <NewsGrid newsDummy={news} />;
  // }

  /***************************** Using Server Side Data Fetching ************************************/

  // const response = await fetch("http://localhost:8080/news");

  // if (!response.ok) {
  //   throw new Error("Failed to fetch news");
  // }

  // const data = (await response.json()) as NewsDummyData[];

  // return <NewsGrid newsDummy={data} />;

  /***************************** No APIs, directly fetching from DB from  ************************************/
  const news = await getAllNews();

  return <NewsGrid newsDummyData={news} />;
};

export default page;
