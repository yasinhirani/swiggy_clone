import { NextRequest, NextResponse } from "next/server";
import users from "@/shared/model/userOrders.model";
import { connect } from "@/dbConfig/dbConfig";

export async function POST(request: NextRequest) {
  try {
    connect();
    const { email, cartData } = await request.json();
    const user = users;
    const existingUser = await user.findOne({ email });
    if (!existingUser) {
      const userToAdd = new users({
        email,
        orders: [cartData],
        userId: "abc123",
      });
      await userToAdd.save();
    } else {
      await user.updateOne(
        { email },
        {
          $push: { orders: cartData },
        }
      );
    }
    return NextResponse.json({
      message: "Order placed successfully.",
      success: true,
    });
  } catch (err) {
    return NextResponse.json({ message: err, success: false });
  }
}
