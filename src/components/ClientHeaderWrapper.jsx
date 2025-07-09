"use client";
import Header from "./Header";
import { usePathname } from "next/navigation";

export default function ClientHeaderWrapper() {
  const pathname = usePathname();
  const hideHeader = pathname.startsWith("/login") || pathname.startsWith("/register");
  if (hideHeader) return null;
  return <Header />;
} 