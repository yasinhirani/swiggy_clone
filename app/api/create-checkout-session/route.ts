import { SWIGGY_SEARCH_IMG_URL } from "@/core/utils/common";
import { NextRequest, NextResponse } from "next/server";

// eslint-disable-next-line import/no-extraneous-dependencies
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request: NextRequest) {
  const { email, cartData, userLocation } = await request.json();

  const orderId = crypto.randomUUID();

  const updatedProductData = cartData.Items.map((product: ICartItems) => {
    return {
      quantity: product.Quantity,
      price_data: {
        currency: "inr",
        unit_amount: product.Price * 100,
        product_data: {
          name: product.ItemName,
          images: [
            `${SWIGGY_SEARCH_IMG_URL}${cartData.RestaurantDetails.RestaurantImage}`
          ]
        }
      }
    };
  });

  const stripeSession = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    customer_email: email,
    shipping_address_collection: {
      allowed_countries: ["IN", "US"]
    },
    line_items: updatedProductData,
    mode: "payment",
    success_url: `https://yasin-swiggy-clone.vercel.app/success?orderId=${orderId}`,
    cancel_url: `https://yasin-swiggy-clone.vercel.app/failed`,
    metadata: {
      email,
      images: JSON.stringify(
        `${SWIGGY_SEARCH_IMG_URL}${cartData.RestaurantDetails.RestaurantImage}`
      ),
      orderDetails: JSON.stringify(cartData),
      orderId,
      userLocation: JSON.stringify(userLocation)
    }
  });

  return NextResponse.json({ success: true, id: stripeSession.id });
}
