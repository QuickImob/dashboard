'use client';

import './styles.css';
import {useI18n} from "@/locales/client";
import {useRouter} from "next/navigation";
import ChangeLanguage from '../changeLanguage';
import { IoLogInOutline } from "react-icons/io5";
import Link from 'next/link';
import { useState } from 'react';

export const Header = () => {
    const t = useI18n()
    const router = useRouter()
    const [open, setOpen] = useState(false);

    const handleToggleClick = () => {
      setOpen(!open);
    };

    return(
        <>
        <div className="header">
            <div className="header-container">
                <div className="header-logo">
                    Logo
                </div>
                <div className="header-actions">
                    <ChangeLanguage/>
                    <div className="login-button">
                        <Link href="/login">{t('Enter')}<IoLogInOutline /></Link>
                    </div>
                    <div className="toogle-menu">
                        <div
                            className={`toogle-icon ${open}`}
                            onClick={handleToggleClick}
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="header-margin"></div>
        </>
    )
}