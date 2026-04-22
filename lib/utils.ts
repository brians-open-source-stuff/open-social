import { UserProfile } from "@/types"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getUserInitials(profile: UserProfile) {
  const firstname = profile?.firstname[0] || "N";
  const lastname = profile?.lastname[0] || "N";

  return firstname + lastname;
}

export function getTimePosted(timestamp: Date | string) {
  const created = new Date(timestamp).getTime();
  const now = Date.now();
  const diffMs = Math.max(0, now - created);

  const minutes = Math.floor(diffMs / 60000);

  if (minutes < 4) return "now";
  if (minutes < 60) return `${minutes} minutes ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return hours === 1 ? "1 hour ago" : `${hours} hours ago`;

  return Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(created);
}