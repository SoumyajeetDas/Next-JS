import React, { Suspense } from "react";
import FilteredNews from "./filteredNews";
import FilteredMonths from "./filteredMonths";

const FilteredNewsPage = async ({
  params,
}: {
  params: { filter: string[] };
}) => {
  let selectedYear = params?.filter?.[0];
  let selectedMonth = params?.filter?.[1];

  return (
    <>
      {/* Granular Data Fetching and Loading Data 
      Ref : https://cognizant.udemy.com/course/nextjs-react-the-complete-guide/learn/lecture/43340734#overview */}
      <Suspense fallback={<p>Loading Months...</p>}>
        {
          <FilteredMonths
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
          />
        }
      </Suspense>
      <Suspense fallback={<p>Loading News...</p>}>
        {
          <FilteredNews
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
          />
        }
      </Suspense>
    </>
  );
};

export default FilteredNewsPage;
