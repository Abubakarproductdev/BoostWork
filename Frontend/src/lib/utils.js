import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const API_BASE = "https://boostworks-hvgxe2dcemf2hnf0.southeastasia-01.azurewebsites.net";
