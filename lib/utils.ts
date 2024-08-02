import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertDateFormat(dateStr: string) {
  // Parse the input date string to a Date object
  const date = new Date(dateStr);

  // Extract the day, month, and year from the Date object
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const year = date.getUTCFullYear();

  // Format the date into 'dd-mm-yyyy'
  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
}
