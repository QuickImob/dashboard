import {ReactNode} from "react";
import NextAuthSessionProvider from "@/providers/sessionProvider";
import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";
import { nextAuthOptions } from "@/utils/authOptions";
import Dashboard from "@/app/components/dashboard";

export default async function Layout({children}: { children: ReactNode }) {
  const session = await getServerSession(nextAuthOptions)

  // if (!session) {
  //   redirect('/login')
  // }

  return (
    <NextAuthSessionProvider>
      <Dashboard children={children}/>
    </NextAuthSessionProvider>
  )
}
