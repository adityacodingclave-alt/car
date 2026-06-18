import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "BAIC SUV Off-road and On-road Experience",
  description:
    "Drive the BAIC SUVs and Enjoy 10 Years Unlimited Mileage Warranty",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/baic-original.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
