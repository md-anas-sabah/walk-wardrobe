import AuthUser from "@/middleware/AuthUser";
import { NextResponse } from "next/server";

const stripe = require("stripe")(
  "pk_test_51OSkwzSFtQACX9TJIITRem2G9EFW6B6OxbIXfTrgDqVJWe4nsWGUcKomVlyXsp8iNq7qHADJ2PG74TEv0rndUUwb00kOuRTcDr"
);

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const isAuthUser = await AuthUser(req);
    if (isAuthUser) {
      const res = await req.json();

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: res,
        mode: "payment",
        success_url:
          "https://walk-wardrobe.vercel.app/checkout" + "?status=success",
        cancel_url:
          "https://walk-wardrobe.vercel.app/checkout" + "?status=cancel",
      });

      return NextResponse.json({
        success: true,
        id: session.id,
      });
    } else {
      return NextResponse.json({
        success: true,
        message: "You are not authenticated",
      });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Something went wrong ! Please try again",
    });
  }
}
