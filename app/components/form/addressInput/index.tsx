'use client';

import './styles.css';
import useFields from "@/hooks/useFields";
import {useI18n} from "@/locales/client";
import 'react-toastify/dist/ReactToastify.css';
import { TextInput } from '../textInput';
import { SearchCep } from './searchCep';
import { NumberInput } from '../numberInput';

interface AddressFormProps {
    sendAddress: (data:any) => void;
}

export const AddressForm = ({sendAddress}: AddressFormProps) => {
    const t = useI18n()

    const {fields, handleFields} = useFields({
        city:'',
        zip_code:'',
        country:'',
        state:'',
        district:'',
        complement:'',
        street_n:'',
        street:''
      })

      const handleCepData = async (data: any) => {
        const fieldPromises = [
            handleFields({
                name: 'district',
                value: data.bairro || '',
            }),
            handleFields({
                name: 'zip_code',
                value: Number(data.cep.replace('-', '')) || '',
            }),
            handleFields({
                name: 'complement',
                value: data.complemento || '',
            }),
            handleFields({
                name: 'city',
                value: data.localidade || '',
            }),
            handleFields({
                name: 'street',
                value: data.logradouro || '',
            }),
            handleFields({
                name: 'state',
                value: data.uf || '',
            }),
            handleFields({
                name: 'country',
                value: 'Brasil',
            }),
        ];
    
        await Promise.all(fieldPromises);
    
        sendAddress(fields);
    };

    return(
        <div className="addressForm">
            <div className="addressRow cep">
                <SearchCep
                    id='zip_code'
                    label={t('Zip Code')}
                    sendInput={handleFields}
                    sendData={handleCepData}
                />
            </div>
            <div className="addressRow street">
                <TextInput
                    id='street'
                    label={t('Street')}
                    sendInput={handleFields}
                    old={fields.street}
                />
                <NumberInput
                    id='street_n'
                    label={t('Number')}
                    sendInput={handleFields}
                />
            </div>
            <div className="addressRow district">
                <TextInput
                    id='district'
                    label={t('District')}
                    sendInput={handleFields}
                    old={fields.district}
                />
                <TextInput
                    id='complement'
                    label={t('Complement')}
                    sendInput={handleFields}
                    old={fields.complement}
                />
            </div>
            <div className="addressRow city">
                <TextInput
                    id='country'
                    label={t('Country')}
                    sendInput={handleFields}
                    old={fields.country}
                />
                <TextInput
                    id='state'
                    label={t('State')}
                    sendInput={handleFields}
                    old={fields.state}
                />
                <TextInput
                    id='city'
                    label={t('City')}
                    sendInput={handleFields}
                    old={fields.city}
                />
            </div>
        </div>
    )
}