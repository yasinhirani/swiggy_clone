"use client";
import Navbar from "@/core/components/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Mukta } from "next/font/google";
import { useEffect } from "react";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { setCartFromLocalStorage } from "@/features/addToCart/addToCart";
import { setCurrentLocation } from "@/features/location/location";
import { setLoading } from "@/features/loading/loading";

const inter = Mukta({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title:
//     "Order food online from India's best food delivery service. Order from restaurants near you",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (localStorage.cartData) {
      const cartData = JSON.parse(localStorage.getItem("cartData") as string);
      store.dispatch(setCartFromLocalStorage(cartData));
    }
    if (localStorage.userLocation) {
      const userLocation = JSON.parse(
        localStorage.getItem("userLocation") as string
      );
      store.dispatch(setCurrentLocation(userLocation));
    }
    store.dispatch(setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <html lang="en">
      <head>
        <title>
          {`Order food online from India's best food delivery service. Order from
          restaurants near you`}
        </title>
        <meta name="description" content="Swiggy clone" />
      </head>
      <UserProvider>
        <Provider store={store}>
          <body className={inter.className}>
            <div className="w-full h-full bg-white flex flex-col">
              <Navbar />
              {children}
            </div>
            <Toaster />
          </body>
        </Provider>
      </UserProvider>
    </html>
  );
}
