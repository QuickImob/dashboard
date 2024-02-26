import './styles.css'
import { IoIosArrowForward } from "react-icons/io"
import Link from 'next/link';

interface BreadcrumbsProps {
    data:any;
    actions?:any;
}

export default function Breadcrumbs({data, actions}: BreadcrumbsProps) {

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
            <Link href={item.link}><button key={index}>{item.icon}{item.label}</button></Link>
        ))}    
        </div>
    </div>
    </>
  )
}
