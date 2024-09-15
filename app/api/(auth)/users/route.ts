import connectDb from "@/lib/db"
import User from "@/lib/models/user.model";
import { NextResponse } from "next/server"

export const GET = async()=> {
    try {
        await connectDb();
        const users = await User.find();
        return new NextResponse(JSON.stringify(users), {status: 200});
    } catch (error: any) {
        return new NextResponse("Error while fetching all users"+ error.message, {status: 500});
    }
}