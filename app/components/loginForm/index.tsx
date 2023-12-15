'use client';

import { Button } from "reactstrap";
import './styles.css';
import { EmailInput } from "../form/emailInput";
import useFields from "@/hooks/useFields";
import {useI18n} from "@/locales/client";
import { PasswordInput } from "../form/passwordInput";
import {useRouter} from "next/navigation";
import {signIn} from "next-auth/react";
import Link from "next/link";

export const LoginForm = () => {
    const t = useI18n()
    const router = useRouter()

    const {fields, handleFields} = useFields({
        email: '',
        password:''
      })

      const submitForm = async () => {

        const response = await signIn('credentials', {
            email: fields.email,
            password: fields.password,
            redirect: false
        })
    
        if (response?.error) {
          return
        }
    
        router.replace('/dashboard')
      }
    

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
                <Button onClick={submitForm}>{t('Enter')}</Button>
                <Link href={''}>Ainda não tem cadastro? <b>Cadastre-se</b>.</Link>
            </div>
        </div>
    )
}