import { connectToDB } from "@utils/database";
import User from "@models/user";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDB();
  const user = await User.findOne({ email: "453628567@qq.com" });
  console.log("获取到的user", user);
  return new NextResponse("查询完毕");
}
