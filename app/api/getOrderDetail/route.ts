import { connect } from "@/dbConfig/dbConfig";
import users from "@/shared/model/userOrders.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { email, orderId } = await request.json();
  try {
    connect();
    const user = users;
    const userData = await user.findOne({ email });
    const filteredOrder = userData.orders.filter(
      (order: any) => order.orderId === orderId
    );
    return NextResponse.json({
      success: true,
      orderDetails: filteredOrder[0]
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong..."
    });
  }
}
