"use client";
import DesktopHomePage from "@/pages/DesktopHomePage";
import { useEffect } from "react";

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <DesktopHomePage />;
}
export default Home;
