import {ReactNode} from "react";
import NextAuthSessionProvider from "@/providers/sessionProvider";
import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";
import { nextAuthOptions } from "@/utils/authOptions";

export default async function Layout({children}: { children: ReactNode }) {
  const session = await getServerSession(nextAuthOptions)

  if (!session) {
    redirect('/login')
  }

  return (
    <NextAuthSessionProvider>
      {children}
    </NextAuthSessionProvider>
  )
}
