'use client';

import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
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
    const [activeItem, setActiveItem] = useState<string | null>(null);

    useEffect(() => {
      const updateActiveItem = () => {
          const currentPath = window.location.pathname;
          const remainingPath = currentPath.replace(/^\/[^\/]+/, '');
          setActiveItem(remainingPath);
      };

      updateActiveItem();

      const handleLinkClick = (event:any) => {
          const link = event.currentTarget.getAttribute('href');
          setActiveItem(link);
      };

      const links = document.querySelectorAll('.dash-menu a');
      links.forEach((link) => {
          link.addEventListener('click', handleLinkClick);
      });

      return () => {
          links.forEach((link) => {
              link.removeEventListener('click', handleLinkClick);
          });
      };
  }, []);

  return (
    <>
    <div className={`dash-sidebar ${sidebarState}`}>
        <div className="dash-menu">
        {menu.map((item, index) => (
          <div className="item" key={index}>
            {activeItem === item.link && <span className="top-curve"></span>}
            <Link
              href={item.link}
              className={`${activeItem === item.link ? 'active' : item.link}`}
            >{item.icon}<span>{!sidebarState && item.label}</span></Link>
            {activeItem === item.link && <span className="bottom-curve"></span>}
          </div>
        ))}
        </div>
    </div>
    <div className={`dash-content ${sidebarState}`}>
        {children}
    </div>
    </>
  )
}
