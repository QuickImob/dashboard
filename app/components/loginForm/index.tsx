'use client';

import { Button, Spinner } from "reactstrap";
import './styles.css';
import { EmailInput } from "../form/emailInput";
import useFields from "@/hooks/useFields";
import {useI18n} from "@/locales/client";
import { PasswordInput } from "../form/passwordInput";
import {useRouter} from "next/navigation";
import {signIn} from "next-auth/react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";

export const LoginForm = () => {
    const t = useI18n()
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const {fields, handleFields} = useFields({
        email: '',
        password:''
      })

      const submitForm = async () => {
        try {
            setIsSubmitting(true)
            const response = await signIn('credentials', {
                email: fields.email,
                password: fields.password,
                redirect: false
            })
            if (!response?.error) {
                setIsSubmitting(false)

                toast.success('Login bem-sucedido!', {
                    position: "bottom-right",
                })
                router.replace('/dashboard');
            } else {
                setIsSubmitting(false)

                toast.error('Erro ao fazer login. Verifique suas credenciais.', {
                    position: "bottom-right",
                })
            }
        } catch (error) {
            console.error('Erro inesperado:', error);
        }
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
                <Link href={'/recovery'}><p>{t('Forgot password?')}</p></Link>
                <Button
                    onClick={submitForm}
                    className="login-button"
                >
                    {t('Enter')}
                    {isSubmitting && <Spinner />}
                </Button>
                <Link href={'/register'}>{t("Don't have a registration yet?")} <b>{t("Register")}</b>.</Link>
            </div>
            <ToastContainer />
        </div>
    )
}