'use client';

import { Button } from "reactstrap";
import './styles.css';
import { EmailInput } from "../form/emailInput";
import useFields from "@/hooks/useFields";
import {useI18n} from "@/locales/client";
import { PasswordInput } from "../form/passwordInput";
import {useRouter} from "next/navigation";
import { TextInput } from "../form/textInput";
import { ToogleButtonsInput } from "../form/toogleButtonsInput";
import { RiTeamLine } from "react-icons/ri";
import { BsPerson } from "react-icons/bs";

export const RegisterForm = () => {
    const t = useI18n()
    const router = useRouter()

    const {fields, handleFields} = useFields({
        name: '',
        email:'',
        phone:'',
        type:'',
        password:'',
        confirm_password:''
      })

      const submitForm = async () => {
        console.log(fields)
      }
    
      const typeOptions = [
        {
            label: t('Autonomous'),
            value: 'f',
            icon: <BsPerson />
        },
        {
            label: t('Company'),
            value: 'j',
            icon: <RiTeamLine />
        }
      ]

    return(
        <div className="registerFormContainer">
            <h1>{t('Register')}</h1>
            <div className="registerForm">
                <TextInput
                    id='name'
                    label={t('Name')}
                    sendInput={handleFields}
                />
                <EmailInput
                    id='email'
                    label={t('Email')}
                    sendInput={handleFields}
                />
                <ToogleButtonsInput
                    id='type'
                    label={t('You are?')}
                    options={typeOptions}
                    sendInput={handleFields}
                />
                <PasswordInput
                    id='password'
                    label={t('Password')}
                    sendInput={handleFields}
                />
                <PasswordInput
                    id='confirm_password'
                    label={t('Password Confirmation')}
                    sendInput={handleFields}
                />
                <Button onClick={submitForm}>{t('Send')}</Button>
            </div>
        </div>
    )
}