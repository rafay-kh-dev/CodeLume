import React from "react";

export const metadata = {
  title: "Blogs | CodeLume",
  description:
    "Explore the latest articles, tutorials, and digital insights from CodeLume engineers.",
  alternates: {
    canonical: "https://www.codelume.online/blogs",
  },
  openGraph: {
    title: "Blogs | CodeLume",
    description:
      "Explore the latest articles, tutorials, and digital insights from CodeLume engineers.",
    url: "https://www.codelume.online/blogs",
    type: "website",
  },
};

export default function BlogsLayout({ children }) {
  return <>{children}</>;
}