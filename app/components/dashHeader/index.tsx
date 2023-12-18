'use client';

import { useSelector, useDispatch } from 'react-redux';
import {setOpen} from '@/app/server/redux/actions';

export const DashHeader = () => {
    const open = useSelector((state: any) => state.open);
    const dispatch = useDispatch();

    const handleClick = () => {
        console.log(open)
        dispatch(setOpen(!open));
      };

  return (
    <div className="dash-header">
      <div className="dash-header-left">
        <div className={`toogle-icon ${open}`} onClick={handleClick}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className="dash-header-center">Logo</div>
      <div className="dash-header-right"></div>
    </div>
  );
};