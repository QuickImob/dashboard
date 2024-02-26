import { CiFolderOn } from "react-icons/ci";
import './styles.css';
import { useEffect, useRef, useState } from "react";
import { MdDriveFileRenameOutline, MdOutlineCreateNewFolder, MdOutlineKeyboardBackspace } from "react-icons/md";
import NewFolderModal from "./newFolder";
import { BiSolidFolderMinus, BiSolidFolderPlus } from "react-icons/bi";
import { RiLoopRightLine } from "react-icons/ri";
import AlterFolderModal from "./alterFolder";
import { useI18n } from "@/locales/client";
import usePost from "@/hooks/usePost";
import RenameImageModal from "./renameImage";

interface YourGalleryProps {
    user:any;
}

const YourGallery = ({user}: YourGalleryProps) => {
    const t = useI18n()
    const dragRef = useRef(null);
    const [selectedFolder, setSelectedFolder] = useState('')
    const [selectedImage, setSelectedImage] = useState(0)
    const [selectedImageName, setSelectedImageName] = useState('')
    const [selectedImages, setSelectedImages] = useState([]);
    const [newFolderOpen, setNewFolderOpen] = useState(false)
    const [alterFolderOpen, setAlterFolderOpen] = useState(false)
    const [selectedImageGallery, setSelectedImageGallery] = useState('')
    const [companyImages, setCompanyImages] = useState([])
    const [renameImageOpen, setRenameImageOpen] = useState(false)

    const {success, error, handlePost, loading} = usePost();
    const {success: successImage, error: errorImage, handlePost: handlePostImage, loading: loadingImage} = usePost();

    useEffect(() => {
        if(user){
            updateShowcontent()
        }
    }, [user])

    const updateShowcontent = () => {
        setSelectedImageName('')
        setSelectedImage(0)
        handlePost('folders', {company_id: user?.user?.Company?.id})
            
        if(success){
            console.log(success)
        }

        handlePostImage('gallery', {company_id: user?.user?.Company?.id})

        if(successImage){
            console.log(successImage)
        }
    }

    const folderMock = [
        {
            label: 'Pasta 1',
            slug: 'pasta1',
            content:[
                {
                    alt:'Imagem 1 pasta 1',
                    thumb:'teste.jpg'
                },
            ]
        },
        {
            label: 'Pasta 2',
            slug: 'pasta2',
            content:[]
        },
        {
            label: 'Pasta 3',
            slug: 'pasta3',
            content:[
                {
                    alt:'Imagem 1 pasta 3',
                    thumb:'teste.jpg'
                },
            ]
        },
        {
            label: 'Pasta 4',
            slug: 'pasta4',
            content:[
                {
                    alt:'Imagem 1 pasta 4',
                    thumb:'teste.jpg'
                },
            ]
        },
        {
            label: 'Pasta 5',
            slug: 'pasta5',
            content:[
                {
                    alt:'Imagem 1 pasta 5',
                    thumb:'teste.jpg'
                },
            ]
        },
        {
            label: 'Pasta 6',
            slug: 'pasta6',
            content:[
                {
                    alt:'Imagem 1 pasta 6',
                    thumb:'teste.jpg'
                },
            ]
        },
        {
            label: 'Pasta 7',
            slug: 'pasta7',
            content:[
                {
                    alt:'Imagem 1 pasta 7',
                    thumb:'teste.jpg'
                },
            ]
        },
        {
            label: 'Pasta 8',
            slug: 'pasta8',
            content:[
                {
                    alt:'Imagem 1 pasta 8',
                    thumb:'teste.jpg',
                    id:1
                },
                {
                    alt:'Imagem 2 pasta 8',
                    thumb:'teste.jpg',
                    id:2
                },
                {
                    alt:'Imagem 3 pasta 8',
                    thumb:'teste.jpg',
                    id:3
                },
            ]
        },
    ]

    console.log(success)

    return (
        <>
        <div className="folder-gallery">
            {selectedFolder === '' ?
            <>
            <div className="title">
                <h3>{t('General')}</h3>
                <div className="flex items-center gap-4">
                    {selectedImage !== 0 && <button onClick={() => setRenameImageOpen(!renameImageOpen)}><MdDriveFileRenameOutline />{t('Rename image')}</button>}
                    {selectedImage !== 0 && <button onClick={() => setNewFolderOpen(!newFolderOpen)}><RiLoopRightLine />{t('Change folder')}</button>}
                    <button onClick={() => setNewFolderOpen(!newFolderOpen)}><MdOutlineCreateNewFolder />{t('New folder')}</button>
                </div>
            </div>
            <div className="gallery-container">
                {success.length > 0 && success?.map((folder:any, index:number) => (
                    <div className="folder" onClick={() => {
                        setSelectedFolder(folder.slug)
                    }} key={index}>
                        {folder?.content?.length > 0 ? <BiSolidFolderPlus /> : <BiSolidFolderMinus />}
                        <span>{folder.name}</span>
                    </div>
                ))}
                {successImage.length > 0 && successImage?.map((image:any, index:number) => (
                    <div className={`image ${image.id === selectedImage ? 'active' : ''}`} onClick={() => {
                        setSelectedImage(selectedImage => selectedImage === image.id ? 0 : image.id)
                        setSelectedImageName(selectedImageName => selectedImageName === image.alt ? '' : image.alt)
                    }} key={index}>
                        <div className="cover" style={{backgroundImage:`url('${image.url}')`}}></div>
                    </div>
                ))}
            </div>
            <div className="title">
                <h3>{t('Property')}</h3>
            </div>
            <div className="gallery-container">
                {folderMock.length > 0 ?
                    folderMock.map((folder, index) => (
                        <div className="folder" onClick={() => {
                            setSelectedFolder(folder.slug)
                        }} key={index}>
                            <CiFolderOn />
                            <span>{folder.label}</span>
                        </div>
                    ))
                    :
                    <p>{t('There are no folders here yet.')}</p>
                    }
            </div>
            </>
            :
            <div className="image-gallery">
                <div className="title">
                    <h3>{folderMock.filter((folder:any) => folder.slug === selectedFolder)[0].label}</h3>
                    <div className="actions">
                        {selectedImageGallery !== '' &&
                            <button onClick={() => {
                                setAlterFolderOpen(true)
                            }}><RiLoopRightLine />{t('Change folder')}</button>
                        }
                        <button onClick={() => {
                            setSelectedFolder('')
                            setSelectedImageGallery('')
                        }}><MdOutlineKeyboardBackspace />{t('Go back')}</button>
                    </div>
                </div>
                <div className="gallery-image-container">
                    {folderMock
                    .filter((folder:any) => folder.slug === selectedFolder)[0]
                    .content.length > 0 ?
                        folderMock
                        .filter((folder:any) => folder.slug === selectedFolder)[0]
                        .content
                        .map((image:any, index:number) => (
                            <div
                                className={`${selectedImageGallery === image.id ? 'image-item selected' : 'image-item'}`}
                                onClick={() => {
                                    setSelectedImageGallery(image.id)
                                }}
                                key={index}
                            >
                                <div className="image-cover"></div>
                                <p>{image.alt}</p>
                            </div>
                        ))
                    :
                        <p>{t('There are no images here yet.')}</p>
                    }
                </div>
            </div>
            }
        </div>
        <NewFolderModal
            user={user}
            open={newFolderOpen}
            toggle={() => setNewFolderOpen(!newFolderOpen)}
        />
        <RenameImageModal
            selectedImage={selectedImage}
            selectedImageName={selectedImageName}
            open={renameImageOpen}
            toggle={() => setRenameImageOpen(!renameImageOpen)}
            updateShowcontent={updateShowcontent}
        />
        <AlterFolderModal
            open={alterFolderOpen}
            toggle={() => setAlterFolderOpen(!alterFolderOpen)}
        />
        </>
    );
};

export default YourGallery;