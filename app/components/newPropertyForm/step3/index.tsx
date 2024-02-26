'use client';

import { BsHouseAdd } from 'react-icons/bs';
import { useI18n } from '@/locales/client';
import { NumberInput } from '../../form/numberInput';
import { TextInput } from '../../form/textInput';
import './styles.css';
import { EnterpriseListInput } from '../../form/enterpriseSelect';

interface NewPropertyStep3Props {
    required:boolean
    fields:any
    session:any
    handleFields:any
    setActive: any
}

export const NewPropertyStep3 = ({
    required, fields, session, handleFields, setActive
}: NewPropertyStep3Props) => {
    const t = useI18n()

    return (
    <>
        <span className="step-icon"><BsHouseAdd /></span>
        <h3>{t('New property')}</h3>
        <p>{t('Property address')}</p>
        <div className="container-inputs">
            <NumberInput
                id='zip_code'
                label={t('Zip Code')}
                sendInput={handleFields}
            />
            <div className="row-inputs street">
                <TextInput
                    id='street'
                    label={t('Street')}
                    sendInput={handleFields}
                />
                <NumberInput
                    id='number'
                    label={t('Number')}
                    sendInput={handleFields}
                />
            </div>
            <div className="row-inputs district">
                <TextInput
                    id='district'
                    label={t('District')}
                    sendInput={handleFields}
                />
                <TextInput
                    id='complement'
                    label={t('Complement')}
                    sendInput={handleFields}
                />
            </div>
            <div className="row-inputs city">
                <TextInput
                    id='city'
                    label={t('City')}
                    sendInput={handleFields}
                />
                <TextInput
                    id='state'
                    label={t('State')}
                    sendInput={handleFields}
                />
                <TextInput
                    id='country'
                    label={t('Country')}
                    sendInput={handleFields}
                />
            </div>
            <EnterpriseListInput
                id='building_id'
                label={t('Building')}
                sendInput={handleFields}
                activeNewform={() => setActive(true)}
                user={session}
            />
        </div>
    </>
    )
  }

//   <TextInput
//   id='building'
//   label={t('Building')}
//   sendInput={handleFields}
// />
// <TextInput
//   id='floor'
//   label={t('Floor')}
//   sendInput={handleFields}
// />
// <TextInput
//   id='unit'
//   label={t('Unit')}
//   sendInput={handleFields}
// />