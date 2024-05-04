import { Fira_Code } from "next/font/google";
import Footer from './components/shared/Footer';
import HeaderNavigation from './components/shared/HeaderNavigation';
import DataProvider from './context/DataContext';
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
        <DataProvider>
          <HeaderNavigation />
          <div className='min-h-[70vh]'>
            {children}
          </div>
          <Footer />
        </DataProvider>
        <Toaster/>
      </body>
    </html>
  );
}
