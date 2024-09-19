import connectDb from "@/lib/db";
import { Category } from "@/lib/models/category.model";
import User from "@/lib/models/user.model";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    if (!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid or missing userId" }),
        { status: 400 }
      );
    }
    await connectDb();
    const user = await User.findById(userId);
    if (!user) {
      return new NextResponse(JSON.stringify({ message: "User not found!" }), {
        status: 400,
      });
    }
    const categories = await Category.find({
      user: new Types.ObjectId(userId),
    });
    if (!categories) {
      return new NextResponse(
        JSON.stringify({ message: "User id is not valid!" }),
        { status: 400 }
      );
    }
    return new NextResponse(JSON.stringify(categories), { status: 200 });
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
};

export const POST = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const { title } = await request.json();
    if (!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid or missing userId" }),
        { status: 400 }
      );
    }
    await connectDb();
    const user = await User.findById(userId);
    if (!user) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }
    const category = new Category({
      title,
      user: new Types.ObjectId(userId),
    });
    await category.save();
    if (!category) {
      return new NextResponse(
        JSON.stringify({ message: "Error while creating the category" }),
        { status: 500 }
      );
    }
    return new NextResponse(
      JSON.stringify({ message: "Category is created successfully", category }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        message: "Error in creating category",
        error: error.message,
      }),
      { status: 500 }
    );
  }
};


