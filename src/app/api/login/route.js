import connectToDB from "@/database";
import User from "@/models/user";
import { compare } from "bcryptjs";
import Joi from "joi";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().password().required(),
});

export async function POST(req) {
  await connectToDB();
  const { email, password } = await req.json();

  const { error } = schema.validate({ email, password });
  if (error) {
    return NextResponse.json({
      success: false,
      message: error.details[0].message,
    });
  }

  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return NextResponse.json({
        success: false,
        message: "Account not found with this email",
      });
    }

    const checkPassword = await compare(password, checkUser.password);
    if (!checkPassword) {
      return NextResponse.json({
        success: false,
        message: "Password you enter is incorrect.",
      });
    }

    // created token
    const token = jwt.sign(
      {
        id: checkUser._id,
        email: checkUser?.email,
        role: checkUser?.role,
      },
      "default_secret_key",
      { expiresIn: "1d" }
    );
    // After creating token now we have to create data.
    const finalData = {
      token,
      user: {
        email: checkUser.email,
        name: checkUser.name,
        _id: checkUser._id,
        role: checkUser.role,
      },
    };

    return NextResponse.json({
      success: true,
      message: "Login Successful!!",
      finalData,
    });
  } catch (e) {
    console.log("Error while logging in, Please Try again!!");

    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again later",
    });
  }
}
