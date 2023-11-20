import { connect } from "@/dbConfig/dbConfig";
import users from "@/shared/model/userOrders.model";
import { NextRequest, NextResponse } from "next/server";

// eslint-disable-next-line import/no-extraneous-dependencies
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_SIGNATURE_SECRET;

export async function POST(req: NextRequest) {
  const payload = await req.text();
  const sig = req.headers.get("stripe-signature") as string;

  const fulfillOrder = async (session: any) => {
    const { email, orderDetails, orderId, userLocation } = session.metadata;
    const orderDetailsJson = JSON.parse(orderDetails);
    const userLocationJson = JSON.parse(userLocation);
    const orderObj = {
      orderId,
      orderDetails: orderDetailsJson,
      userLocation: userLocationJson
    };
    try {
      connect();
      const user = users;
      const existingUser = await user.findOne({ email });
      if (!existingUser) {
        // eslint-disable-next-line new-cap
        const userToAdd = new users({
          email,
          orders: [orderObj],
          userId: crypto.randomUUID()
        });
        await userToAdd.save();
      } else {
        await user.updateOne(
          { email },
          {
            $push: { orders: orderObj }
          }
        );
      }
      console.log("order successfully placed");
    } catch (err: any) {
      console.log(`❌ Error message: ${err.message}`);
    }
  };

  let event;

  try {
    event = await stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err: any) {
    console.log(`❌ Error message: ${err.message}`);
  }

  // Handle the event

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    fulfillOrder(session);
  }

  return NextResponse.json({
    received: true,
    payload
  });
}
