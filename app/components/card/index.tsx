import { ReactNode } from 'react';
import './styles.css';

interface GadgetCardProps{
    children: ReactNode;
    className?: string;
    bg?:string;
}

export const GadgetCard = ({children, className, bg}: GadgetCardProps) => {

    return(
        <div className={`gadget-card ${className} ${bg ? bg : 'bg-white'}`}>
            {children}
        </div>
    )
}