"use client";
import { LoadingContext, LocationContext } from "@/core/context";
import DesktopHomePage from "@/pages/DesktopHomePage";
import DesktopHomePageWithoutLocation from "@/pages/DesktopHomePageWithoutLocation";
import SkeletonHomepageLoading from "@/pages/SkeletonHomepageLoading";
import { useContext, useEffect } from "react";

function Home() {
  const { locationInfo } = useContext(LocationContext);
  const { loading } = useContext(LoadingContext);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      {!loading && locationInfo && <DesktopHomePage />}
      {!loading && !locationInfo && <DesktopHomePageWithoutLocation />}
    </>
  );
}
export default Home;
