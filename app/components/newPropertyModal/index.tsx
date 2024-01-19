import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './styles.css';
import useFields from '@/hooks/useFields';
import usePost from '@/hooks/usePost';
import { TextInput } from '../form/textInput';
import { useI18n } from '@/locales/client';
import { OwnerInput } from '../form/ownerInput';
import { useSession } from "next-auth/react";

function NewPropertyModal({ open, toggle }: { open: boolean; toggle: () => void }) {
  const t = useI18n()
  const {success, error, handlePost, handlePut, loading} = usePost();
  const { data: session, status } = useSession()

  const {fields, handleFields} = useFields({
      title:'',
      id_extern:'',
      category_id:'',
      user_id:'',
      company_id:'',
      owner_id:'',
    })

    useEffect(() => {
      if(session?.user.id){
        handleFields({
          name:'user_id',
          value: session.user.id.toString()
        })
      }
    }, [session])

  return (
    <>
      <Modal isOpen={open} toggle={toggle} size="md" className="newPropertyModal">
        <ModalHeader toggle={toggle}>{t('New property')}</ModalHeader>
        <ModalBody>
          <TextInput
              id='title'
              label={t('Title')}
              sendInput={handleFields}
          />
          <OwnerInput
              id='title'
              label={t('Owner')}
              sendInput={handleFields}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            {t('Create')}
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            {t('Cancel')}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default NewPropertyModal;