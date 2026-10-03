import Header from "../components/header";
import Footer from "../components/footer";
import "./globals.css";

export const metadata = {
  title: "CodeLume® | Bespoke Web Engineering & Digital Agency",
  description: "Ready to upgrade your digital presence? Book a consultation with Rafay and let's build something exceptional together.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#030712] text-white">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}