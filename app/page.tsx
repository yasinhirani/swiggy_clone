"use client";
import { LoadingContext, LocationContext } from "@/core/context";
import DesktopHomePage from "@/core/components/DesktopHomePage";
import DesktopHomePageWithoutLocation from "@/core/components/DesktopHomePageWithoutLocation";
import MobileHomePage from "@/core/components/MobileHomePage";
import { useContext, useEffect } from "react";

function Home() {
  const { locationInfo } = useContext(LocationContext);
  const { loading } = useContext(LoadingContext);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      {!loading &&
        locationInfo &&
        (window.innerWidth > 920 ? <DesktopHomePage /> : <MobileHomePage />)}
      {!loading && !locationInfo && <DesktopHomePageWithoutLocation />}
    </>
  );
}
export default Home;
