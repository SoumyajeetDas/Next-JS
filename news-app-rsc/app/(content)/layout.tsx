import type { Metadata } from "next";
import "../globals.css";
import NavLink from "@/component/navLink/navLink";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NavLink />
        {children}
      </body>
    </html>
  );
}
