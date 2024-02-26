'use client';

import { TextInput } from '@/app/components/form/textInput';
import { BsHouseAdd } from 'react-icons/bs';
import { useI18n } from '@/locales/client';
import { NumberInput } from '../../form/numberInput';
import { IncrementalInput } from '../../form/incrementalInput';
import { CurrencyInput } from '../../form/currencyInput';

interface NewPropertyStep1Props {
    required:boolean
    fields:any
    session:any
    handleFields:any
    setActive: any
}

export const NewPropertyStep4 = ({
    required, fields, session, handleFields, setActive
}: NewPropertyStep1Props) => {
    const t = useI18n()

    return (
    <>
        <span className="step-icon"><BsHouseAdd /></span>
        <h3>{t('New property')}</h3>
        <p>{t('Main features')}</p>
        <div className="container-inputs">
            <div className="row-inputs">
                <TextInput
                    id='registration'
                    label={t('Registration')}
                    sendInput={handleFields}
                />
                <CurrencyInput
                    id='price'
                    label={t('Price')}
                    sendInput={handleFields}
                />
            </div>
            <div className="row-inputs">
                <CurrencyInput
                    id='iptu'
                    label={t('IPTU')}
                    sendInput={handleFields}
                />
                <CurrencyInput
                    id='condominium'
                    label={t('Condominium')}
                    sendInput={handleFields}
                />
            </div>
            <div className="row-inputs">
                <NumberInput
                    id='private_area'
                    label={t('Private area')}
                    sendInput={handleFields}
                />
                <NumberInput
                    id='building_area'
                    label={t('Building area')}
                    sendInput={handleFields}
                />
            </div>
            <div className="row-inputs">
                <IncrementalInput
                    id='bedrooms'
                    label={t('Bedrooms')}
                    sendInput={handleFields}
                />
                <IncrementalInput
                    id='suite'
                    label={t('Suites')}
                    sendInput={handleFields}
                />
                <IncrementalInput
                    id='bathrooms'
                    label={t('Bathrooms')}
                    sendInput={handleFields}
                />
                <IncrementalInput
                    id='garages'
                    label={t('Parking spaces')}
                    sendInput={handleFields}
                />
            </div>
        </div>
    </>
    )
  }

//   description:'',