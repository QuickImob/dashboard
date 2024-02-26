'use client';

import { useSelector, useDispatch } from 'react-redux';
import {setOpen} from '@/app/server/redux/actions';
import { useEffect, useState } from 'react';
import { useI18n } from '@/locales/client';
import useFields from '@/hooks/useFields';
import './styles.css';
import { IoClose } from 'react-icons/io5';
import { NewOwnerForm } from '../newOwnerForm';
import { useSession } from 'next-auth/react';
import { Button } from 'reactstrap';
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { NewPropertyStep1 } from './step1';
import { NewPropertyStep4 } from './step2';
import { NewPropertyStep3 } from './step3';
import { NewPropertyStep2 } from './step4';
import { NewCategoryForm } from '../newCategoryForm';
import usePost from '@/hooks/usePost';

export const NewPropertyForm = () => {
  const t = useI18n()
  const { data: session, status } = useSession()
  const tour = useSelector((state: any) => state.local);
  const dispatch = useDispatch();
  const [active, setActive] = useState(false)
  const [activeCategory, setActiveCategory] = useState(false)
  const [required, setRequired] = useState(false)
  const [step, setStep] = useState(1)
  const [updateOwner, setUpdateOwner] = useState(0)
  const [updateCategory, setUpdateCategory] = useState(0)
  const {success, error, handlePost, handlePut, loading} = usePost();

  const {fields: fieldStep1, handleFields: handleFieldsStep1} = useFields({
    title:'',
    id_extern:'',
    category_id:'',
    user_id: String(session?.user?.id),
    company_id: String(session?.user?.Company?.id),
    owner_id:'',
  })

  useEffect(() => {
    if(session?.user){
      handleFieldsStep1({name:'user_id', value: String(session?.user?.id)})
      handleFieldsStep1({name:'company_id', value: String(session?.user?.Company?.id)})
    }
  }, [session])

  const {fields: fieldStep2, handleFields: handleFieldsStep2} = useFields({
    registration:'',
    private_area:'',
    building_area:'',
    iptu:'',
    condominium:'',
    price:'',
    description:'',
    bedrooms:'',
    suite:'',
    bathrooms:'',
    garages:'',
  })

  const {fields: fieldStep3, handleFields: handleFieldsStep3} = useFields({
    description:'',
  })

  const {fields: fieldStep4, handleFields: handleFieldsStep4} = useFields({
    description:'',
  })

  useEffect(() => {
    dispatch(setOpen(false));
  }, [])

  const checkFields = () => {
    setRequired(true)
  }

  const nextStep = async () => {
    if(step === 1){
        try {
            await handlePost('property', fieldStep1);

            if(success){
              console.log(success)
            }
        } catch (error) {
            console.error('Erro ao registrar:', error);
        }
    }
    setStep(step => step + 1)
  }

  const prevStep = () => {
    setStep(step => step - 1)
  }

  const updateOwnerList = () => {
    setUpdateOwner(updateOwner => updateOwner + 1)
  }

  const updateCategoryList = () => {
    setUpdateCategory(updateCategory => updateCategory + 1)
  }

    return (
    session ?
      <div className="new-property-container">
        <div className="new-property-row">
          <div className="new-property-left">
            <div className="content">
                {step === 1 &&
                    <NewPropertyStep1
                        required={required}
                        fields={fieldStep1}
                        session={session}
                        handleFields={handleFieldsStep1}
                        setActive={setActive}
                        setActiveCategory={setActiveCategory}
                        updateOwner={updateOwner}
                        updateCategory={updateCategory}
                    />
                }
                {step === 2 &&
                    <NewPropertyStep2
                        required={required}
                        fields={fieldStep2}
                        session={session}
                        handleFields={handleFieldsStep2}
                        setActive={setActive}
                    />
                }
                {step === 3 &&
                    <NewPropertyStep3
                        required={required}
                        fields={fieldStep3}
                        session={session}
                        handleFields={handleFieldsStep3}
                        setActive={setActive}
                    />
                }
                {step === 4 &&
                    <NewPropertyStep4
                        required={required}
                        fields={fieldStep4}
                        session={session}
                        handleFields={handleFieldsStep4}
                        setActive={setActive}
                    />
                }
          </div>
          <div className="footer">
            <span>{t('Step')} {step} {t('of')} 7</span>
            {fieldStep1.title !== '' && fieldStep1.id_extern !== '' ?
                step === 1 ?
                <Button color="primary" onClick={nextStep}>{t('Next')}<FaArrowRightLong /></Button>
                :
                <>
                    <Button color="primary" onClick={prevStep}><FaArrowLeftLong />{t('Previous')}</Button>
                    <Button color="primary" onClick={nextStep}>{t('Next')}<FaArrowRightLong /></Button>
                </>
            :
                <Button className="disable" color="secondary" onClick={checkFields}>{t('Next')}<FaArrowRightLong /></Button>
            }
        </div>
        </div>
        <div className="new-property-right" style={{backgroundImage:"url('/imovel_example.jpeg')"}}></div>
            {(active || activeCategory) && <div
                className="new-property-overlay"
                onClick={() => {
                  if(active){setActive(false)}
                  if(activeCategory){setActiveCategory(false)}
                }}
            ></div>}
        </div>
        <div className={`new-form-container ${active ? 'active' : ''} ${tour === 'new-owner-modal' ? `active ${tour}` : ''}`}>
            <div
                className="new-form-close"
                onClick={() => setActive(false)}
            ><IoClose /></div>

            <NewOwnerForm
              updateOwnerList={updateOwnerList}
              user={session}
              toggle={() => setActive(false)}
            />

        </div>

        <div className={`new-form-container ${activeCategory ? 'active' : ''}`}>
            <div
                className="new-form-close"
                onClick={() => setActiveCategory(false)}
            ><IoClose /></div>

            <NewCategoryForm
              updateCategoryList={updateCategoryList}
              user={session}
              toggle={() => setActiveCategory(false)}
            />

        </div>
      </div>
      :
    <></>
    )
  }
