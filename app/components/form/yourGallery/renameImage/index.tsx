import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './styles.css';
import { useI18n } from '@/locales/client';
import useFields from '@/hooks/useFields';
import { TextInput } from '../../textInput';
import usePost from '@/hooks/usePost';

function RenameImageModal({ open, updateShowcontent, toggle, selectedImage, selectedImageName }: { open: boolean; toggle: () => void; updateShowcontent: () => void; selectedImage:any; selectedImageName:string }) {
    const t = useI18n()
    const {success, error, handlePost, handlePut, loading} = usePost();

    const {fields, handleFields} = useFields({
        alt: selectedImageName,
      })

      const submitForm = async () => {
        try {
            await handlePut('image-gallery/' + selectedImage, fields);
            toggle()
            updateShowcontent()
        } catch (error) {
            console.error('Erro ao registrar:', error);
        }
    };

  return (
    <>
      <Modal isOpen={open} toggle={toggle} centered size="md" className="galleryModal">
        <ModalHeader toggle={toggle}>{t('Rename image')}</ModalHeader>
        <ModalBody>
            <TextInput
                id='alt'
                label={t('Name')}
                sendInput={handleFields}
                old={selectedImageName}
            />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={submitForm}>
            {t('Update')}
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            {t('Cancel')}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default RenameImageModal;