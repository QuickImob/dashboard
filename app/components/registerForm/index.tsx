'use client';

import { Button } from "reactstrap";
import './styles.css';
import { EmailInput } from "../form/emailInput";
import useFields from "@/hooks/useFields";
import {useI18n} from "@/locales/client";
import { PasswordInput } from "../form/passwordInput";
import {useRouter} from "next/navigation";
import Link from "next/link";

export const RegisterForm = () => {
    const t = useI18n()
    const router = useRouter()

    const {fields, handleFields} = useFields({
        email: '',
        password:''
      })

      const submitForm = async () => {

      }
    

    return(
        <div className="registerFormContainer">
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
                <Button onClick={submitForm}>{t('Enter')}</Button>

            </div>
        </div>
    )
}