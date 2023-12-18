'use client';

import {ReactNode} from "react";
import { RxDashboard } from "react-icons/rx";
import { BsHouseGear } from "react-icons/bs";
import { DashHeader } from "@/app/components/dashHeader";
import DashboardBody from "@/app/components/dashboardBody";
import { Provider } from 'react-redux';
import store from '@/app/server/redux/store';
import './styles.css'

export default function Dashboard({children}: { children: ReactNode }) {

  const menu = [
    {
      label:'Dashboard',
      link:'/dashboard',
      icon:<RxDashboard />,
    },
    {
      label:'Seus imóveis',
      link:'/properties',
      icon:<BsHouseGear />,
    },
  ]

  return (
    <Provider store={store}>
      <div className="dash-header">
        <DashHeader />
        <div className="dash-header-center">
          Logo
        </div>
        <div className="dash-header-right"></div>
      </div>
      <div className="dash-body">
        <DashboardBody children={children} menu={menu}/>
      </div>
    </Provider>
  )
}
