import { NextResponse } from "next/server";
import { io } from "socket.io-client";

export async function POST(request) {
   try {
      const req = await request.json();

      // const socket = io("http://localhost:4000");
      const socket = io("https://server-socket-k10p.onrender.com/");
      socket.emit("send-message", req.message);

      return NextResponse.json("success", { status: 200 });
   } catch (e) {
      console.log(e);
   }
}
