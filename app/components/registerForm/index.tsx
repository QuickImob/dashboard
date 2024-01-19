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
import axios from "@/lib/axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import { PhoneInput } from "../form/phoneInput";
import { AddressForm } from "../form/addressInput";

export const RegisterForm = () => {
    const t = useI18n()
    const router = useRouter()
    const [passwordError, setPasswordError] = useState('')
    const [dataSend, setDataSend] = useState<any>()

    const {fields, handleFields} = useFields({
        name: '',
        email:'',
        phone:'',
        person_type:'',
        password:'',
      })

      const sendAddress = (data: any) => {
        setDataSend(data)
    };

      const submitForm = async () => {
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(fields.password as string)) {
            setPasswordError('A senha deve ter ao menos uma letra maiúscula, um número, um símbolo e oito caracteres.');
            toast.error(passwordError);
            return;
        }

        if (fields.password !== fields.confirm_password) {
            setPasswordError('As senhas não coincidem.');
            toast.error(passwordError);
            return;
        }

        try {
            setPasswordError('');
            const fieldsObject = fields as Record<string, any>;
            const dataSendObject = dataSend as Record<string, any>;

            const combinedData = { ...fieldsObject, ...dataSendObject };
            await axios.post('users', combinedData);
            router.replace('/login');
        } catch (error) {
            console.error('Erro ao registrar:', error);
            toast.error('Erro ao fazer registro. Tente novamente mais tarde.');
        }
    };
    
      const typeOptions = [
        {
            label: t('Autonomous'),
            value: 'pf',
            icon: <BsPerson />
        },
        {
            label: t('Company'),
            value: 'pj',
            icon: <RiTeamLine />
        }
      ]

    return(
        <>
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
                <PhoneInput
                    id='phone'
                    label={t('Phone')}
                    sendInput={handleFields}
                />
                <ToogleButtonsInput
                    id='person_type'
                    label={t('You are?')}
                    options={typeOptions}
                    sendInput={handleFields}
                />
                <AddressForm
                    sendAddress={sendAddress}
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
        <ToastContainer position="bottom-right"/>
        </>
    )
}