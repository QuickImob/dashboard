'use client';

import { BsHouseAdd } from 'react-icons/bs';
import { useI18n } from '@/locales/client';
import { TextEditorInput } from '../../form/textEditorInput';

interface NewPropertyStep3Props {
    required:boolean
    fields:any
    session:any
    handleFields:any
    setActive: any
}

export const NewPropertyStep2 = ({
    required, fields, session, handleFields, setActive
}: NewPropertyStep3Props) => {
    const t = useI18n()

    return (
    <>
        <span className="step-icon"><BsHouseAdd /></span>
        <h3>{t('New property')}</h3>
        <p>{t('Property description')}</p>
        <div className="container-inputs">
            <TextEditorInput
                id='description'
                label={t('Description')}
                sendInput={handleFields}
            />
        </div>
    </>
    )
  }

//   description:'',