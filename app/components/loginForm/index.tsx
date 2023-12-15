'use client';

import { Button, Input, Label } from "reactstrap";
import './styles.css';
import { EmailInput } from "../form/emailInput";
import useFields from "@/hooks/useFields";
import {useI18n} from "@/locales/client";
import { useEffect } from "react";
import { PasswordInput } from "../form/passwordInput";

export const LoginForm = () => {
    const t = useI18n()

    const {fields, handleFields} = useFields({
        email: '',
        password:''
      })

      useEffect(() => {
        console.log(fields)
      }, [fields])

    return(
        <div className="loginFormContainer">
            <div className="loginImage"></div>
            <h1>{t('User Login')}</h1>
            <div className="loginForm">
                <EmailInput
                    id='email'
                    label={t('Email')}
                    sendInput={handleFields}
                />
                <PasswordInput
                    id='password'
                    label={t('Password')}
                    sendInput={handleFields}
                />
                <Button>{t('Enter')}</Button>
            </div>
        </div>
    )
}