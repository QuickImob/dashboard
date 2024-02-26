import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './styles.css';
import { useI18n } from '@/locales/client';
import useFields from '@/hooks/useFields';
import { TextInput } from '../../textInput';

function AlterFolderModal({ open, toggle }: { open: boolean; toggle: () => void }) {
    const t = useI18n()

    const {fields, handleFields} = useFields({
        name: '',
      })

  return (
    <>
      <Modal isOpen={open} toggle={toggle} centered size="md" className="galleryModal">
        <ModalHeader toggle={toggle}>{t('Select folder')}</ModalHeader>
        <ModalBody>
            <TextInput
                id='name'
                label={t('Name')}
                sendInput={handleFields}
            />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            {t('To alter')}
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            {t('Cancel')}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default AlterFolderModal;