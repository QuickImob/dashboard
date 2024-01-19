'use client';

import Link from "next/link";
import { ReactNode } from "react";
import { useSelector } from 'react-redux';

interface MenuItem {
    label: string;
    link: string;
    icon: ReactNode;
  }
  
  interface DashboardBodyProps {
    children: ReactNode;
    menu: MenuItem[];
  }

export default function DashboardBody({children, menu}: DashboardBodyProps) {
    const sidebarState = useSelector((state: any) => state.open);

  return (
    <>
    <div className={`dash-sidebar ${sidebarState}`}>
        <div className="dash-menu">
        {menu.map((item, index) => (
            <Link key={index} href={item.link}>{item.icon}<span>{!sidebarState && item.label}</span></Link>
        ))}
        </div>
    </div>
    <div className={`dash-content ${sidebarState}`}>
        {children}
    </div>
    </>
  )
}
