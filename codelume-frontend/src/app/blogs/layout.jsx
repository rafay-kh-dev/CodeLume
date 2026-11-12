import React from "react";

export const metadata = {
  title: "Blogs | Rafay's Rafay's CodeLume",
  description:
    "Explore the latest articles, tutorials, and digital insights from Rafay's CodeLume engineers.",
  alternates: {
    canonical: "https://www.Rafay's CodeLume.online/blogs",
  },
  openGraph: {
    title: "Blogs | Rafay's Rafay's CodeLume",
    description:
      "Explore the latest articles, tutorials, and digital insights from Rafay's CodeLume engineers.",
    url: "https://www.Rafay's CodeLume.online/blogs",
    type: "website",
  },
};

export default function BlogsLayout({ children }) {
  return <>{children}</>;
}
