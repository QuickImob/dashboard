import { ReactNode } from 'react';
import './styles.css';

interface GadgetCardProps{
    children: ReactNode;
    className?: string;
}

export const GadgetCard = ({children, className}: GadgetCardProps) => {

    return(
        <div className={`gadget-card ${className}`}>
            {children}
        </div>
    )
}