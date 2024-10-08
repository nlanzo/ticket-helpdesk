import { Rubik } from "next/font/google";
import "./globals.css";

export const dynamic = "force-dynamic";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata = {
  title: "Helpdesk",
  description: "Ticketing system for customer support",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={rubik.className}>{children}</body>
    </html>
  );
}
