'use client';

import { TextInput } from '@/app/components/form/textInput';
import { useI18n } from '@/locales/client';
import useFields from '@/hooks/useFields';
import './styles.css';
import { EmailInput } from '../form/emailInput';
import { PhoneInput } from '../form/phoneInput';
import { Button } from 'reactstrap';
import usePost from '@/hooks/usePost';
import { RequiredCheck } from '../form/requiredCheck';
import { FaArrowRightLong } from 'react-icons/fa6';
import { useState } from 'react';

interface NewOwnerFormProps {
    toggle:() => void
    user:any
    updateOwnerList:() => void;
}

export const NewOwnerForm = ({toggle, user, updateOwnerList}: NewOwnerFormProps) => {
  const t = useI18n()
  const {success, error, handlePost, handlePut, loading} = usePost();
  const [required, setRequired] = useState(false)

  const {fields, handleFields} = useFields({
    name:'',
    email:'',
    phone:'',
    company_id:user?.user.Company.id,
  })

  const createOwner = async () => {
    try {
        await handlePost('owners', fields);
        toggle()
        updateOwnerList()

        handleFields({name:'name', value:''})
        handleFields({name:'email', value:''})
        handleFields({name:'phone', value:''})
    } catch (error) {
        console.error('Erro ao registrar:', error);
    }
  }

  const checkFields = () => {
    setRequired(true)
  }

    return (
      <div className="new-owner-container">
            <h3>{t('New owner')}</h3>
            <RequiredCheck check={required} fields={fields} id={'name'}>
              <TextInput
                id='name'
                label={t('Name')}
                sendInput={handleFields}
                old={fields.name}
              />
            </RequiredCheck>
            <PhoneInput
                id='phone'
                label={t('Phone')}
                sendInput={handleFields}
                old={fields.phone}
            />
            <EmailInput
                id='email'
                label={t('Email')}
                sendInput={handleFields}
                old={fields.email}
            />
            <div className="new-owner-buttons">
              {fields.name !== '' ?
                <Button color="primary" onClick={createOwner}>
                  {t('Create')}
                </Button>
                :
                  <Button className="disable" color="secondary" onClick={checkFields}>{t('Create')}</Button>
                }
                <Button color="secondary" onClick={toggle}>
                    {t('Cancel')}
                </Button>
            </div>
      </div>
    )
  }