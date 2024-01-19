'use client'

import NewPropertyModal from '../newPropertyModal';
import './styles.css'
import { IoIosArrowForward } from "react-icons/io"
import {useState} from 'react'

interface BreadcrumbsProps {
    data:any;
    actions?:any;
}

export default function Breadcrumbs({data, actions}: BreadcrumbsProps) {

    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(!modalOpen)
    }

  return (
    <>
    <div className="breadcrumbs-container">
        <div className="breadcrumbs-links">
        {data.map((item:any, index:any) => (
            <div key={index} className="bread-item">
                {index !== 0 && <IoIosArrowForward />}
                {index === 0 ?
                    <p>{item.label}</p>
                    :
                    <a href={item.link}>{item.label}</a>
                }
            </div>
        ))}
        </div>
        <div className="breadcrumbs-actions">
        {actions && actions.map((item:any, index:any) => (
            <button key={index} onClick={openModal}>{item.icon}{item.label}</button>
        ))}    
        </div>
    </div>
    <NewPropertyModal
        open={modalOpen}
        toggle={openModal}
    />
    </>
  )
}
