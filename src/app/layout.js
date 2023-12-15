import GlobalState from "@/context";
import "./globals.css";
import { Jost } from "next/font/google";
import Nav from "@/components/Nav";

const jost = Jost({
  subsets: ["latin"],
});

export const metadata = {
  title: "Walk Wardrobe",
  description: "An e-commerce website for clothing and accessories",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="../../public/images/favicon.png" />
      </head>
      <body className={jost.className}>
        <GlobalState>
          <Nav />
          <main className="text-black flex min-h-screen flex-col mt-[80px]">
            {children}
          </main>
        </GlobalState>
      </body>
    </html>
  );
}
