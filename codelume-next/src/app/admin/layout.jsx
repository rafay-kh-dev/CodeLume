export const metadata = {
  title: "Admin Portal | CodeLume",
  description: "Secure content management system and admin dashboard.",
  // Yeh line Google ko is folder ke kisi bhi page ko index karne se rokegi
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function AdminLayout({ children }) {
  return <>{children}</>;
}
