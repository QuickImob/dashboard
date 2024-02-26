'use client';

import { TextInput } from '@/app/components/form/textInput';
import { OwnerListInput } from '@/app/components/form/ownerSelect';
import { CategoryListInput } from '../../form/categorySelect';
import { BsHouseAdd } from 'react-icons/bs';
import { RequiredCheck } from '../../form/requiredCheck';
import { useI18n } from '@/locales/client';
import { useDispatch, useSelector } from 'react-redux';

interface NewPropertyStep1Props {
    required:boolean
    fields:any
    session:any
    handleFields:any
    setActive: any
    setActiveCategory: any
    updateOwner: number
    updateCategory: number
}

export const NewPropertyStep1 = ({
    required, fields, session, handleFields, setActive, updateOwner, updateCategory, setActiveCategory
}: NewPropertyStep1Props) => {
    const t = useI18n()
    const tour = useSelector((state: any) => state.local);

    return (
    <>
        <span className="step-icon"><BsHouseAdd /></span>
        <h3>{t('New property')}</h3>
        <RequiredCheck check={required} fields={fields} id={'title'}>
            <TextInput
                id='title'
                label={t('Title')}
                sendInput={handleFields}
                className={tour === 'new-property-title' ? tour : ''}
            />
        </RequiredCheck>
        <RequiredCheck check={required} fields={fields} id={'id_extern'}>
            <TextInput
                id='id_extern'
                label={t('Reference code')}
                sendInput={handleFields}
                className={tour === 'new-property-ref' ? tour : ''}
            />
        </RequiredCheck>
        <OwnerListInput
            id='owner_id'
            label={t('Owner')}
            sendInput={handleFields}
            activeNewform={() => setActive(true)}
            user={session}
            updateOwner={updateOwner}
            className={tour === 'new-property-owner' ? tour : ''}
        />
        <CategoryListInput
            id='category_id'
            label={t('Category')}
            sendInput={handleFields}
            activeNewform={() => setActiveCategory(true)}
            user={session}
            updateCategory={updateCategory}
        />
    </>
    )
  }