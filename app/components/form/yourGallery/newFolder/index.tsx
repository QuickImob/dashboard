import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './styles.css';
import { useI18n } from '@/locales/client';
import useFields from '@/hooks/useFields';
import { TextInput } from '../../textInput';
import usePost from '@/hooks/usePost';

function NewFolderModal({ open, toggle, user }: { open: boolean; toggle: () => void; user: any }) {
    const t = useI18n()
    const {success, error, handlePost, handlePut, loading} = usePost();

    const {fields, handleFields} = useFields({
        name: '',
        company_id: user?.user?.Company?.id
      })

      const submitForm = async () => {
        try {
            await handlePost('create-folder', fields);
            toggle()
        } catch (error) {
            console.error('Erro ao registrar:', error);
        }
    };

  return (
    <>
      <Modal isOpen={open} toggle={toggle} centered size="md" className="galleryModal">
        <ModalHeader toggle={toggle}>{t('New folder')}</ModalHeader>
        <ModalBody>
            <TextInput
                id='name'
                label={t('Name')}
                sendInput={handleFields}
            />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={submitForm}>
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

export default NewFolderModal;