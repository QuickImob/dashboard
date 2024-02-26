import { Button, Input, Label } from 'reactstrap';
import { FaRegEdit } from "react-icons/fa";
import useFields from '@/hooks/useFields';
import { useSession } from "next-auth/react";
import { TextInput } from '../../form/textInput';
import { EmailInput } from '../../form/emailInput';
import { PhoneInput } from '../../form/phoneInput';
import { useI18n } from '@/locales/client';
import {useEffect, useState} from 'react'
import './profileEdit.css'
import usePost from '@/hooks/usePost';
import GalleryModal from '../../galleryModal';

interface ProfileEditProps {
    user:any;
}

export default function ProfileEdit({user}: ProfileEditProps) {
    const t = useI18n()
    const {success, error, handlePost, handlePut, loading} = usePost();
    const [galleryModalOpen, setGalleryModalOpen] = useState(false);

    const { fields, handleFields } = useFields({
        name: '',
        email: '',
        phone: '',
    });

    useEffect(() => {
        if(user){
            handleFields({
                name: 'name',
                value: user?.user?.name || '',
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

    const updateUser = async () => {
        await handlePut('users/' + fields.email, fields)

        console.log(success)
        console.log(error)
    }

  return (
    <div className="profileEditContainer">
        <div className="profile-side-bar">
            <div className="profile-image">
                <div className="edit-image"
                    onClick={() => setGalleryModalOpen(!galleryModalOpen)}
                >
                    <FaRegEdit />
                </div>
            </div>
            <div className="profile-info">
                <h3>{user && user?.user?.name}</h3>
                <p>{user && user?.user?.email}</p>
                <small>Umuarama/PR</small>
            </div>
        </div>
        <div className="profile-body">
            <div className="field-list-item">
                <Label>{t('Name')}</Label>
                <TextInput
                    id='name'
                    sendInput={handleFields}
                    old={fields.name}
                />
            </div>
            <div className="field-list-item">
                <Label>{t('Email')}</Label>
                <EmailInput
                    id='email'
                    sendInput={handleFields}
                    old={fields.email}
                    disabled={true}
                />
            </div>
            <div className="field-list-item">
                <Label>{t('Phone')}</Label>
                <PhoneInput
                    id='phone'
                    sendInput={handleFields}
                    old={fields.phone}
                />
            </div>
            <div className="saveButtonContainer">
                <Button onClick={updateUser} color="primary">Salvar alterações</Button>
            </div>
        </div>
        <GalleryModal
            open={galleryModalOpen}
            user={user}
            toggle={() => setGalleryModalOpen(!galleryModalOpen)}
        />
    </div>
  )
}