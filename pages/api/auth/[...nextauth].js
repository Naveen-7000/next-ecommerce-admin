import clientPromise from "@/lib/mongodb";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { getServerSession } from "next-auth";

const adminEmails = ["navinbhusare97n@gmail.com","navinbhusare89@gmail.com"];



export const authOptions = {
  providers: [
    // ...add providers heree
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    session: ({ session, token, user }) => {
      if (session?.user && adminEmails.includes(session.user.email)) {
        return session;
      } else {
        return false;
      }
    },
  },
}
export default NextAuth(authOptions);

export async function isAdmin(req,res){
  const session = await getServerSession(req,res,authOptions);
  if(!adminEmails.includes(session?.user?.email)){
    res.status(401);
    res.end();
    throw 'You are not authorized to perform this action';
};
}
