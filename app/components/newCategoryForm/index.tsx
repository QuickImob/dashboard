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

interface NewCategoryFormProps {
    toggle:() => void
    user:any
    updateCategoryList:() => void;
}

export const NewCategoryForm = ({toggle, user, updateCategoryList}: NewCategoryFormProps) => {
  const t = useI18n()
  const {success, error, handlePost, handlePut, loading} = usePost();
  const [required, setRequired] = useState(false)

  const {fields, handleFields} = useFields({
    name:'',
    company_id:user?.user.Company.id,
  })

  const createOwner = async () => {
    try {
        await handlePost('categories', fields);
        toggle()
        updateCategoryList()

        handleFields({name:'name', value:''})
    } catch (error) {
        console.error('Erro ao registrar:', error);
    }
  }

  const checkFields = () => {
    setRequired(true)
  }

    return (
      <div className="new-owner-container">
            <h3>{t('New category')}</h3>
            <RequiredCheck check={required} fields={fields} id={'name'}>
              <TextInput
                id='name'
                label={t('Name')}
                sendInput={handleFields}
                old={fields.name}
              />
            </RequiredCheck>
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