import Header from "../components/header";
import Footer from "../components/footer";
import "./globals.css";

export const metadata = {
  title: "CodeLume® | Bespoke Web Engineering & Digital Solutions by Rafay",
  description:
    "Ready to upgrade your digital presence? Book a consultation with Rafay and let's build something exceptional together.",
  openGraph: {
    title: "CodeLume® | Bespoke Web Engineering & Digital Solutions by Rafay",
    description:
      "Ready to upgrade your digital presence? Book a consultation with Rafay and let's build something exceptional together.",
    url: "https://codelume.online",
    siteName: "CodeLume",
    images: [
      {
        url: "/codelume-banner.jpg", // Ensure this image is placed inside your 'public' folder
        width: 1200,
        height: 630,
        alt: "CodeLume Digital Agency",
      },
    ],
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeLume® | Bespoke Web Engineering & Digital Agency",
    description:
      "Ready to upgrade your digital presence? Book a consultation with Rafay and let's build something exceptional together.",
    images: ["/codelume-banner.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* Updated to White Theme to match the new Antigravity design system */}
      <body className="bg-white text-black antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
