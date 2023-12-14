import NextAuth from 'next-auth'
import internal from "stream";

declare module 'next-auth' {
  interface Session {
    user: {
      id: bigint,
      name: string,
      email: string,
    },
    token: string
  }
}
