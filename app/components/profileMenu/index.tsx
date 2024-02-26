'use client';

import { useI18n } from '@/locales/client';
import ChangeLanguage from '../changeLanguage';
import Logout from '../logoutButton';
import {useState} from 'react';
import './styles.css';
import { useSelector } from 'react-redux';

export const ProfileMenu = () => {
    const t = useI18n()
    const [open, setOpen] = useState(false)
    const tour = useSelector((state: any) => state.local);

  return (
    <>
    <div className={`profileMenuToogle ${tour === 'profile-menu' ? tour : ''}`} onClick={() => setOpen(!open)}></div>
    <div className={`profileMenu ${open} ${tour === 'profile-menu-open' ? tour : ''}`}>
        <li><span>{t('Language')}:</span><ChangeLanguage/></li>
        <span className="divider"></span>
        <a href="/dashboard/profile">Perfil</a>
        <span className="divider"></span>
        <Logout/>
    </div>
    </>

  );
};