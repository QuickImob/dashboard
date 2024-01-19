'use client';

import { useSelector, useDispatch } from 'react-redux';
import {setOpen} from '@/app/server/redux/actions';
import './styles.css';
import { ProfileMenu } from '../profileMenu';

export const DashHeader = () => {
    const open = useSelector((state: any) => state.open);
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(setOpen(!open));
      };

  return (
    <div className="dash-header">
      <div className="dash-header-left">
        <div className={`toogle-icon ${open ? false : true}`} onClick={handleClick}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className="dash-header-center">
        Logo
      </div>
      <ProfileMenu/>
    </div>
  );
};