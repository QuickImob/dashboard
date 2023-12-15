import {NextAuthOptions} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "@/lib/axios";


export const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {label: "email", type: "text"},
        password: {label: "password", type: "password"}
      },

      // @ts-ignore
      async authorize(credentials: { email?: string; password?: string }, req) {
        const response = await axios
          .post('/login', {
            email: credentials?.email,
            password: credentials?.password
          })

        if (!response.data?.success) {
          return null
        }

        return response.data.data
      }
    })
  ],
  callbacks: {
    async jwt({token, user}) {
      user && (token.user = user)
      return token
    },
    async session({session, token}) {
      session = token.user as any
      return session
    }
  },
  pages: {
    signIn: '/login'
  }
}