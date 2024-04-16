import { Fira_Code } from "next/font/google";
import HeaderNavigation from './components/shared/HeaderNavigation';
import "./globals.css";

const inter = Fira_Code({
  subsets: ["latin"],
  weights: ["400", "500", "600", "700", "800", "900"],
  variable: '--font-fira_code'
});

export const metadata = {
  title: "FavFood - Get Delicious Food at Home",
  description: "Get Delicious Food at Home",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} fira_code`}>
        <HeaderNavigation />
        {children}
      </body>
    </html>
  );
}
