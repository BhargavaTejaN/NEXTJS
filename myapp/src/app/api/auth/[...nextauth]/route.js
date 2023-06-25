import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from 'next-auth/providers/credentials'
import connect from "@/utils/db";
import User from "@/models/User";
import bcrypt from "bcrypt"

const handler =  NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      id:"credentials",
      name : "Credentials",
      async authorize(credentials){

        await connect()

        try {

          const user = await User.findOne({email: credentials.email});

          if(user){
            // check password

            const checkPassword = await bcrypt.compare(
              credentials.password,user.password
            )

            if(checkPassword){
              return user
            }else{
              throw new Error("Incorrect Password");
            }

          } else {
            throw new Error("User Not Found");
          }
          
        } catch (error) {
          throw new  Error()
        }

      }
    })
  ],
  pages : {
    error : "/dashboard/login",
  }
});

export {handler as GET, handler as POST};