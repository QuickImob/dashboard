import React, { useState } from 'react';
import { IoCloudUploadOutline, IoImagesOutline } from 'react-icons/io5';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './styles.css';
import ImageUpload from '../form/singleImageInput';
import { useI18n } from '@/locales/client';

function GalleryModal({ open, toggle }: { open: boolean; toggle: () => void }) {
    const t = useI18n()
    const [tabSelected, setTabSelected] = useState(1)

    const handleFileChange = (file: File | null) => {
        console.log(file);
    };

  return (
    <>
      <Modal isOpen={open} toggle={toggle} size="xl" className="galleryModal">
        <ModalHeader toggle={toggle}>{t('Image gallery')}</ModalHeader>
        <ModalBody>
            <div className="container-tabs">
                <div
                    className={`tab ${tabSelected === 1 && 'active'}`}
                    onClick={() => setTabSelected(1)}
                ><IoImagesOutline />{t('Your gallery')}</div>
                <div
                    className={`tab ${tabSelected === 2 && 'active'}`}
                    onClick={() => setTabSelected(2)}
                ><IoCloudUploadOutline />{t('Send image')}</div>
            </div>
            {tabSelected === 2 &&
                <ImageUpload onChange={handleFileChange} />
            }
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            {t('Select')}
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            {t('Close')}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default GalleryModal;