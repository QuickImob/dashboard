import React from 'react';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { useState } from 'react';
import './styles.css';
import { Button } from 'reactstrap';

interface ImageUploadProps {
    onChange: (file: File | null) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange }) => {
    const [fileDetails, setFileDetails] = useState<{ name: string; size: number } | null>(null);
    const [thumbnail, setThumbnail] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;
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
                    <Button color="success"><IoCloudUploadOutline />Enviar</Button>
                </div>
                </>
            )}
        </>
    );
};

export default ImageUpload;