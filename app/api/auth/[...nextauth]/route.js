import NextAuth from "next-auth/next";
import GoogleAuthProvider from "next-auth/providers/google";

import User from "@models/user";
import { connectToDatabase } from "@utils/database";

const handler = NextAuth({
  providers: [
    GoogleAuthProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });

      session.user.id = sessionUser._id.toString();

      return session;
    },

    async signIn({ profile }) {
      try {
        await connectToDatabase();

        // check if the user already exists
        const userExist = await User.findOne({
          email: profile.email,
        });

        // if not, create a new user
        if (!userExist) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.log(`Sign in failed, error: ${error}`);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
