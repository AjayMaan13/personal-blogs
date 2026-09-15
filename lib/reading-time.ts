import readingTime, { type ReadTimeResults } from "reading-time";

export type ReadingTime = ReadTimeResults;

export function getReadingTime(content: string): ReadingTime {
  return readingTime(content);
}
