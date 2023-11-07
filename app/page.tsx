"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import DesktopHomePage from "@/core/components/DesktopHomePage";
import DesktopHomePageWithoutLocation from "@/core/components/DesktopHomePageWithoutLocation";
import MobileHomePage from "@/core/components/MobileHomePage";
import { IState } from "@/shared/model/state.mode";

function Home() {
  const locationState = useSelector((state: IState) => state.location);
  const loadingState = useSelector((state: IState) => state.loading);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [loadingState]);
  return (
    <>
      {!loadingState.isLoading &&
        locationState.place_id &&
        (window.innerWidth > 920 ? <DesktopHomePage /> : <MobileHomePage />)}
      {!loadingState.isLoading && !locationState.place_id && (
        <DesktopHomePageWithoutLocation />
      )}
    </>
  );
}
export default Home;
