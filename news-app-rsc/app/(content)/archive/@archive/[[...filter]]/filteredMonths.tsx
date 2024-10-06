import {
  getAvailableNewsMonths,
  getAvailableNewsYears,
  getNewsForYear,
} from "@/_lib/newsDB";
import Link from "next/link";
import React from "react";

const FilteredMonths = async ({
  selectedYear,
  selectedMonth,
}: {
  selectedYear: string;
  selectedMonth: string;
}) => {
  let links = await getAvailableNewsYears();
  let newsData = [];

  // Check if the selected year and month are present in the array returned from the DB
  if (
    (selectedYear && !(await getAvailableNewsYears()).includes(selectedYear)) ||
    (selectedMonth &&
      !getAvailableNewsMonths(selectedYear).includes(selectedMonth))
  ) {
    throw new Error("Invalid year or month");
  }

  // If year is selected and month is also selected
  if (selectedYear && selectedMonth) {
    // All links will be empty
    links = [];
  }
  // If year is selected and month is not selected
  else if (selectedYear && !selectedMonth) {
    newsData = await getNewsForYear(selectedYear);

    // Check if news Data is available for the selected year
    if (newsData && newsData.length > 0) {
      // Get the available months for the selected year
      links = getAvailableNewsMonths(selectedYear);
    }
    // If no news data is available for the selected year then show the message, and set links to empty
    else {
      links = [];
    }
  }

  return (
    <header id="archive-header">
      <nav>
        <ul>
          {links.map((link) => (
            <li key={link}>
              <Link
                href={
                  !selectedYear
                    ? `/archive/${link}`
                    : `/archive/${selectedYear}/${link}`
                }
              >
                {link}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default FilteredMonths;
