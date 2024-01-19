'use client';

import { useI18n } from '@/locales/client';
import ChangeLanguage from '../changeLanguage';
import Logout from '../logoutButton';
import {useState} from 'react';
import './styles.css';

export const ProfileMenu = () => {
    const t = useI18n()
    const [open, setOpen] = useState(false)

  return (
    <>
    <div className="profileMenuToogle" onClick={() => setOpen(!open)}></div>
    <div className={`profileMenu ${open}`}>
        <li><span>{t('Language')}:</span><ChangeLanguage/></li>
        <span className="divider"></span>
        <a href="/dashboard/profile">Perfil</a>
        <span className="divider"></span>
        <Logout/>
    </div>
    </>

  );
};