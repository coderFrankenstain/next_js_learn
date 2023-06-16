import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

import User from "@models/user";
import { connectToDB } from "@utils/database";


const handler = NextAuth({
  providers: [
    GitHubProvider(
      {
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
        httpOptions:{
          timeout: 30000
        }
      }
    )
  ],
  callbacks: {
    async session({ session }) {
      await connectToDB();
      console.log("fuck")
      const sessionUser = await User.findOne({email: session.user.email})
      console.log("session ",sessionUser)
      session.user.id = sessionUser._id.toString()

      return session
    },
    async signIn({ profile }) {
      try {
        await connectToDB();
        console.log("获取到的email ",profile.email)
        console.log("获取到的profike ",profile.avatar_url)
        console.log("获取到的profike ",profile)
        //检查用户是否存在
        const userExists = await User.findOne(
          {email: profile.email}
        )

         //如果不存在，就创建一个新用户
        if (!userExists) {
          await User.create({ 
            email: profile.email,
            username: profile.name.replace(" ","").toLowerCase(),
            image: profile.avatar_url 
          });
        }

        return true
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false
      }
    },
  },
});

export { handler as GET, handler as POST };
