import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'

import User from "@/models/user";
import { connectToDb } from "@/utils/database";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      })

      session.user.id = sessionUser._id.toString();

      return session
    },
    async signIn({ profile }) {
      try {
        await connectToDb()
        const userExists = await User.findOne({
          email: profile.email
        })

        if(!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name
             .replace(/\s+/g, '')              
              .replace(/[^a-zA-Z0-9._]/g, '')
              .toLowerCase()
              .slice(0, 20),
            image: profile.picture
          })
        }
        return true
      } catch (error) {
        console.log(error)
        return false
      }
    }
  }

})

export { handler as GET, handler as POST}