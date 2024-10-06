import { NewsDummyData } from "@/component/news/newsGrid";
import newsDummyData from "./newsDummy";

export function getAllNews(): NewsDummyData[] {
  return newsDummyData as unknown as NewsDummyData[];
}

export function getLatestNews(): NewsDummyData[] {
  return newsDummyData.slice(0, 3) as unknown as NewsDummyData[];
}

export function getAvailableNewsYears(): number[] {
  return newsDummyData
    .reduce((years, news) => {
      const year = new Date(news.date).getFullYear();
      if (!years.includes(year as never)) {
        years.push(year as never);
      }
      return years;
    }, [])
    .sort((a, b) => b - a);
}

export function getAvailableNewsMonths(year: string): number[] {
  return newsDummyData
    .reduce((months, news) => {
      const newsYear = new Date(news.date).getFullYear();
      if (newsYear === +year) {
        const month = new Date(news.date).getMonth();
        if (!months.includes(month as never)) {
          months.push((month + 1) as never);
        }
      }
      return months;
    }, [])
    .sort((a, b) => b - a);
}

export function getNewsForYear(year: string): NewsDummyData[] {
  return newsDummyData.filter(
    (news) => new Date(news.date).getFullYear() === +year // +year converts string to number
  );
}

export function getNewsForYearAndMonth(
  year: string,
  month: string
): NewsDummyData[] {
  return newsDummyData.filter((news) => {
    const newsYear = new Date(news.date).getFullYear();
    const newsMonth = new Date(news.date).getMonth() + 1;
    return newsYear === +year && newsMonth === +month;
  });
}
