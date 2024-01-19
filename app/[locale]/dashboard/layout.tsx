import {ReactNode} from "react";
import NextAuthSessionProvider from "@/providers/sessionProvider";
import {redirect} from "next/navigation";
import Dashboard from "@/app/components/dashboard";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/utils/authOptions";
import 'bootstrap/dist/css/bootstrap.min.css';

export default async function Layout({children}: { children: ReactNode }) {
  const session = await getServerSession(nextAuthOptions)

  if (!session) {
     redirect('/login')
  }

  return (
    <NextAuthSessionProvider>
      <Dashboard children={children}/>
    </NextAuthSessionProvider>
  )
}
