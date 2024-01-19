import { Button } from 'reactstrap';
import useFields from '@/hooks/useFields';
import { TextInput } from '../../form/textInput';
import { useI18n } from '@/locales/client';
import { SearchCep } from '../../form/addressInput/searchCep';
import { NumberInput } from '../../form/numberInput';
import './addressEdit.css'
import { PiMapPinThin } from 'react-icons/pi';
import usePost from '@/hooks/usePost';
import { useEffect } from 'react';

interface AddressEditProps {
    user:any;
}

export default function AddressEdit({user}: AddressEditProps) {
    const t = useI18n()
    const {success, error, handlePost, handlePut, loading} = usePost();

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

      useEffect(() => {
        if(user){
            handleFields({
                name: 'city',
                value: user?.user?.city || '',
            })
            handleFields({
                name: 'email',
                value: user?.user?.email || '',
            })
            handleFields({
                name: 'phone',
                value: user?.user?.phone || '',
            })
        }
    }, [user])

      const sendAddress = (fields:any) => {
        console.log(fields)
      }

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

    const updateUser = async () => {
        await handlePut('users/' + fields.email, fields)

        console.log(success)
        console.log(error)
    }

  return (
    <div className="addressEditContainer">
        <div className="profile-side-bar">
            <PiMapPinThin />
        </div>
        <div className="profile-body">
            <div className="field-list-item">
                <SearchCep
                    id='zip_code'
                    label={t('Zip Code')}
                    sendInput={handleFields}
                    sendData={handleCepData}
                />
            </div>
            <div className="field-list-item">
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
            <div className="field-list-item">
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
            <div className="field-list-item">
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
            <div className="saveButtonContainer">
                <Button onClick={updateUser} color="primary">Salvar alterações</Button>
            </div>
        </div>
    </div>
  )
}