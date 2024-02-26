import React from 'react';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { useState } from 'react';
import './styles.css';
import { Button } from 'reactstrap';
import usePost from '@/hooks/usePost';
import useFields from '@/hooks/useFields';

interface ImageUploadProps {
    onChange: (file: File | null) => void;
    user:any;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, user }) => {
    const [fileDetails, setFileDetails] = useState<{ name: string; size: number } | null>(null);
    const [thumbnail, setThumbnail] = useState<string | null>(null);
    const [file, setFile] = useState<any>(null)
    const {success, error, handleFormPost, handlePost, handlePut, loading} = usePost();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;
        console.log(e.target.files?.[0])
        setFile(e.target.files?.[0])
        onChange(selectedFile);

        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setThumbnail(event.target?.result as string);
            };
            reader.readAsDataURL(selectedFile);

            setFileDetails({
                name: selectedFile.name,
                size: selectedFile.size,
            });
        } else {
            setThumbnail(null);
            setFileDetails(null);
        }
    };

    const formatFileSize = (size: number): string => {
        const kilobyte = 1024;
        const megabyte = kilobyte * 1024;
    
        if (size < kilobyte) {
            return `${size} B`;
        } else if (size < megabyte) {
            return `${(size / kilobyte).toFixed(2)} KB`;
        } else {
            return `${(size / megabyte).toFixed(2)} MB`;
        }
    };

      const submitForm = async () => {

        const data = new FormData()
        data.append('company_id', user?.user?.Company?.id)
        data.append('image', file)

        try {
            await handleFormPost('image-gallery', data);
        } catch (error) {
            console.error('Erro ao registrar:', error);
        }
    };

    return (
        <>
            <label htmlFor="fileInput" className="sendFileField">
                <div className="sendFileContainer">
                    <IoCloudUploadOutline />
                    <p>Clique para adicionar uma imagem.</p>
                </div>
            </label>
            <input
                type="file"
                id="fileInput"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />
            {thumbnail && (
                <>
                <div className="thumbnailContainer">
                    <img src={thumbnail} alt="Thumbnail" className="thumbnail" />
                    {fileDetails && (
                        <div className="fileDetails">
                            <p>{fileDetails.name}</p>
                            <p>{formatFileSize(fileDetails.size)}</p>
                        </div>
                    )}
                </div>
                <div className="containerSendButton">
                    <Button color="success" onClick={submitForm}><IoCloudUploadOutline />Enviar</Button>
                </div>
                </>
            )}
        </>
    );
};

export default ImageUpload;