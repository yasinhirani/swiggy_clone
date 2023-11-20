import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import users from "@/shared/model/userOrders.model";

export async function POST(request: NextRequest) {
  const { email } = await request.json();
  try {
    connect();
    const user = users;
    const userData = await user.findOne({ email });
    if (userData) {
      return NextResponse.json({
        message: "",
        success: true,
        orders: userData.orders
      });
    }
    return NextResponse.json({ message: "User not found", success: false });
  } catch (error) {
    return NextResponse.json({
      message: "Something went wrong...",
      success: false
    });
  }
}
