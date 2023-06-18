import clientPromise from "@/lib/mongodb";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

export default NextAuth( {
  // Configure one or more authentication providers
  providers: [
    // ...add providers here
    GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET
    }),
  ],
  adapter : MongoDBAdapter(clientPromise),
}
);
