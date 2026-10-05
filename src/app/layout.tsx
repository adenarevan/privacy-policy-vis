import type { Metadata } from "next";
import { privacyPolicy } from "@/content/privacy-policy";
import "./globals.css";

export const metadata: Metadata = {
  title: `Privacy Policy - ${privacyPolicy.brand}`,
  description: `Privacy Policy for ${privacyPolicy.brand}: collection, use and disclosure of personal data, privacy rights, and contact information.`,
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
