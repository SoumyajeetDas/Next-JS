import { NewsDummyData } from "@/component/news/newsGrid";
import sql from "better-sqlite3";

const db = sql("data.db");

export async function getAllNews(): Promise<NewsDummyData[]> {
  const stmt = db.prepare("SELECT * FROM news");

  await new Promise((resolve) => setTimeout(resolve, 1000));
  return stmt.all() as NewsDummyData[];
}

export async function getNewsItem(slug: string): Promise<NewsDummyData> {
  const newsItem = db.prepare("SELECT * FROM news WHERE slug = ?").get(slug);

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return newsItem as NewsDummyData;
}

export async function getLatestNews(): Promise<NewsDummyData[]> {
  const latestNews = db
    .prepare("SELECT * FROM news ORDER BY date DESC LIMIT 3")
    .all();
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return latestNews as NewsDummyData[];
}

export async function getAvailableNewsYears(): Promise<string[]> {
  const years = db
    .prepare("SELECT DISTINCT strftime('%Y', date) as year FROM news")
    .all()
    .map((year) => (year as { year: number }).year) as unknown as string[];

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return years;
}

export function getAvailableNewsMonths(year: string): string[] {
  return db
    .prepare(
      "SELECT DISTINCT strftime('%m', date) as month FROM news WHERE strftime('%Y', date) = ?"
    )
    .all(year)
    .map((month) => (month as { month: number }).month) as unknown as string[];
}

export async function getNewsForYear(year: string): Promise<NewsDummyData[]> {
  const news = db
    .prepare(
      "SELECT * FROM news WHERE strftime('%Y', date) = ? ORDER BY date DESC"
    )
    .all(year) as NewsDummyData[];

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return news as NewsDummyData[];
}

export async function getNewsForYearAndMonth(
  year: string,
  month: string
): Promise<NewsDummyData[]> {
  const news = db
    .prepare(
      "SELECT * FROM news WHERE strftime('%Y', date) = ? AND strftime('%m', date) = ? ORDER BY date DESC"
    )
    .all(year, month) as NewsDummyData[];

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return news;
}
