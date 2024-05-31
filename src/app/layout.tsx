import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import AddAddressModal from './components/modals/AddAddressModal';
import AddReviewModal from './components/modals/AddReviewModal';
import EditOrderModal from './components/modals/EditOrderModal';
import EditUserModal from './components/modals/EditUserModal';
import SearchModal from './components/modals/SearchModal';
import Footer from './components/shared/Footer';
import HeaderNavigation from './components/shared/HeaderNavigation';
import AuthProvider from './context/AuthProvider';
import DataProvider from './context/DataContext';
import "./globals.css";

const inter = Fira_Code({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: '--font-fira_code'
});


export const metadata: Metadata = {
  title: "FavFood - Get Delicious Food at Home",
  description: "Get Delicious Food at Home",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={`${inter.variable} fira_code`}>
          <DataProvider>
            <HeaderNavigation />
            <div className='min-h-[70vh]'>
              {children}
            </div>
            <Footer />
            <SearchModal />
            <AddAddressModal />
            <EditOrderModal />
            <EditUserModal />
            <AddReviewModal />
          </DataProvider>
          <Toaster />
        </body>
      </html>
    </AuthProvider>
  );
}
