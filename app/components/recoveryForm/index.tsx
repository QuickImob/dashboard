'use client';

import { Button } from "reactstrap";
import './styles.css';
import { EmailInput } from "../form/emailInput";
import useFields from "@/hooks/useFields";
import {useI18n} from "@/locales/client";
import {useRouter} from "next/navigation";
import {signIn} from "next-auth/react";

export const RecoveryForm = () => {
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
            <h1>{t('Password recovery')}</h1>
            <div className="loginForm">
                <EmailInput
                    id='email'
                    label={t('Enter your email to receive the recovery link.')}
                    sendInput={handleFields}
                />
                <Button onClick={submitForm}>{t('Recover password')}</Button>
            </div>
        </div>
    )
}