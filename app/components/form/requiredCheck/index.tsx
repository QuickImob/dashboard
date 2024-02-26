import { useI18n } from '@/locales/client';
import './styles.css';
import { ReactNode, useEffect, useState } from "react";

interface RequiredCheckProps {
  children: ReactNode;
  fields:any;
  id:string;
  check:boolean;
}

export const RequiredCheck = ({children, fields, id, check}: RequiredCheckProps) => {
  const t = useI18n()
  const [active, setActive] = useState(check)

  useEffect(() => {
    if (fields && id && check) {
      if(fields[id] === ''){
        setActive(true)
      }else{
        setActive(false)
      }
    }
  }, [fields, id, check]);


    return(
        <div className={`requiredContainer ${active ? 'active' : ''}`}>
            {children}

            <span>{t('Required field.')}</span>
        </div>
    )
}