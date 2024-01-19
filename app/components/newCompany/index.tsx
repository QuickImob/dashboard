'use client';

import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import './styles.css';
import useFields from '@/hooks/useFields';
import usePost from '@/hooks/usePost';
import { TextInput } from '../form/textInput';
import { useI18n } from '@/locales/client';
import { EmailInput } from '../form/emailInput';
import { PhoneInput } from '../form/phoneInput';
import {useRouter} from "next/navigation";
import axios from "@/lib/axios";
import {useState, useEffect} from 'react';
import { ToogleButtonsInput } from '../form/toogleButtonsInput';
import { BsPerson } from 'react-icons/bs';
import { RiTeamLine } from 'react-icons/ri';
import { useSession } from "next-auth/react";

interface NewCompanyProps {
  newOwner?:() => void;
}

function NewCompany({newOwner}: NewCompanyProps) {
  const t = useI18n()
  const { data: session, status } = useSession()
  const router = useRouter()
  const {success, error, handlePost, handlePut, loading} = usePost();
  const [open, setOpen] = useState(true)

  const toggle = () => {
    setOpen(!open)
  }

  const {fields, handleFields} = useFields({
      name:'',
      email:'',
      phone:'',
      type:'',
      user_id:'',
      document:'',
      creci:''
    })

    useEffect(() => {
      if(session?.user.id){
        handleFields({
          name:'user_id',
          value: session.user.id.toString()
        })
      }
    }, [session])

    const submitForm = async () => {
      try {
          await handlePost('companies', fields);
          toggle()
      } catch (error) {
          console.error('Erro ao registrar:', error);
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

  return (
    <>
      <Modal isOpen={open} toggle={toggle} size="md" className="newPropertyModal">
        <ModalHeader toggle={toggle}>{t('New companie')}</ModalHeader>
        <ModalBody>
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
          <TextInput
            id='document'
            label={t('Document')}
            sendInput={handleFields}
          />
          <TextInput
            id='creci'
            label={'CRECI'}
            sendInput={handleFields}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={submitForm}>{t('Send')}</Button>{' '}
          <Button color="secondary" onClick={toggle}>
            {t('Cancel')}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default NewCompany;