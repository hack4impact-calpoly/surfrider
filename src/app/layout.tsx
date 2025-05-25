import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Carbon Emission Reduction Impact Calculator",
  description:
    "A web app for visualizing the environmental, economic, and societal benefits of renewable energy adoption",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
