import { getNewsForYear, getNewsForYearAndMonth } from "@/_lib/newsDB";
import NewsGrid from "@/component/news/newsGrid";
import React from "react";

const FilteredNews = async ({
  selectedYear,
  selectedMonth,
}: {
  selectedYear: string;
  selectedMonth: string;
}) => {
  let newsData = [];

  // This will be the default message
  let newsContent = <p>Please select a year to show news</p>;

  // If year is selected and month is also selected
  if (selectedYear && selectedMonth) {
    newsData = await getNewsForYearAndMonth(selectedYear, selectedMonth);

    // Check if news Data is available for the selected month and year
    if (newsData && newsData.length > 0) {
      newsContent = <NewsGrid newsDummyData={newsData} />;
    }
    // If no news data is available for the selected month and year then show the message
    else {
      newsContent = <p>No news found for the selected month</p>;
    }
  }
  // If year is selected and month is not selected
  else if (selectedYear && !selectedMonth) {
    newsData = await getNewsForYear(selectedYear);

    // Check if news Data is available for the selected year
    if (newsData && newsData.length > 0) {
      newsContent = <NewsGrid newsDummyData={newsData} />;
    }
    // If no news data is available for the selected year then show the message, and set links to empty
    else {
      newsContent = <p>No news found for the selected year</p>;
    }
  }
  return <>{newsContent}</>;
};

export default FilteredNews;
