'use client';

import { useSelector, useDispatch } from 'react-redux';
import {setOpen, toggleTourClass} from '@/app/server/redux/actions';
import './styles.css';
import { ProfileMenu } from '../profileMenu';
import { Button } from 'reactstrap';
import { MdOutlineLiveHelp } from 'react-icons/md';
import { useI18n } from '@/locales/client';

export const DashHeader = () => {
    const t = useI18n()
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
      <div className="help">
        <Button
          color="primary"
          onClick={() => dispatch(toggleTourClass('new-property-page'))}
        >{t('Interactive Help')}<MdOutlineLiveHelp /></Button>
        <ProfileMenu/>
      </div>

    </div>
  );
};