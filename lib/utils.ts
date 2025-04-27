import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatHumanDate(
  isoOrSqlTimestamp: string,
  opts: Intl.DateTimeFormatOptions & { locale?: string } = {}
): string {
  // Supabase can return either "YYYY-MM-DD HH:mm:ss+TZ"
  // or the ISO form "YYYY-MM-DDTHH:mm:ss.sssZ".
  // Replace the space with `T` so the Date constructor
  // understands it in every JS engine.
  const normalized = isoOrSqlTimestamp.replace(" ", "T");

  const dateObj = new Date(normalized);

  if (Number.isNaN(dateObj.getTime())) {
    return "Invalid date";
  }

  const { locale = "en-US", ...fmt } = opts;

  return new Intl.DateTimeFormat(locale, {
    month: "long",
    day: "numeric",
    year: "numeric",
    ...fmt,
  }).format(dateObj);
}
