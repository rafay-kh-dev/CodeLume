import Header from "../components/header";
import Footer from "../components/footer";
import SupportWidget from "../components/supportwidget";
import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://www.codelume.online"),
  title: "Rafay's CodeLume | Bespoke Web Engineering & Digital Solutions",
  description:
    "Ready to upgrade your digital presence? Book a consultation with Rafay and let's build something exceptional together.",
  alternates: {
    canonical: "https://www.codelume.online",
  },
  openGraph: {
    title: "CodeLume® | Bespoke Web Engineering & Digital Solutions by Rafay",
    description:
      "Ready to upgrade your digital presence? Book a consultation with Rafay and let's build something exceptional together.",
    url: "https://www.codelume.online",
    siteName: "CodeLume",
    images: [
      {
        url: "/codelume-banner.jpg",
        width: 1200,
        height: 630,
        alt: "CodeLume Digital Agency",
      },
    ],
    locale: "en_GB",
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
    <html lang="en" className={`${jakarta.variable} bg-white`}>
      <body className="font-jakarta bg-white text-black antialiased selection:bg-[#4285F4]/20">
        <Header />
        {children}
        <SupportWidget />
        <Footer />
      </body>
    </html>
  );
}
