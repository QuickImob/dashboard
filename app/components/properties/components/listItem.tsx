import './listItem.css'
import UiBadge from '../../ui/badge';
import { PiArrowsVertical } from "react-icons/pi";
import { RiEditBoxLine } from "react-icons/ri";

interface ListItemProps {
    data:any;
}

export default function ListItem({data}: ListItemProps) {

  return (
    <>
    <div className="item-container header">
        <div className="item-cover"></div>
        <div className="item-content">
            <div className="title">Nome do imóvel<PiArrowsVertical /></div>
            <div className="type">Categoria<PiArrowsVertical /></div>
            <div className="created-date">Última atualização<PiArrowsVertical /></div>
            <div className="actions">Desempenho<PiArrowsVertical /></div>
            <div className="status">Status<PiArrowsVertical /></div>
            <div className="edit"></div>
        </div>
    </div>
    {data.map((item: any, index: number) => (
        <div key={index} className="item-container">
            <div className="item-cover">
                <div className="item-image"></div>
            </div>
            <div className="item-content">
                <div className="title">{item.title}</div>
                <div className="type">{item.type}</div>
                <div className="created-date">{item.created_at}</div>
                <div className="actions"></div>
                <div className="status">
                    {item.status === 1 && <UiBadge status='active'/>}
                    {item.status === 0 && <UiBadge status='inactive'/>}
                </div>
                <div className="edit">
                    <RiEditBoxLine/>
                </div>
            </div>
        </div>
    ))}
    </>
  )
}
