import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: NextRequest) {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
  try {
    const swiggyListingUrl = `https://www.swiggy.com/dapi/menu/list/v4?lat=20.5992349&lng=72.9342451&page_type=DESKTOP_WEB_LISTING`;
    const data = await axios.get(swiggyListingUrl).then((res) => res.data);
    return NextResponse.json(
      {
        data,
      },
      { headers: corsHeaders }
    );
  } catch (err) {
    return NextResponse.json({ message: err, success: false });
  }
}
