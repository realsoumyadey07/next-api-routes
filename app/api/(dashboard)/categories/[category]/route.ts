import { NextResponse } from "next/server"

export const PATCH =async (request:Request) => {
     try {
          
     } catch (error: any) {
          return new NextResponse(JSON.stringify({error: error.message}), {status: 500});
     }
}