import { Input, Label } from "reactstrap";
import './styles.css';
import { useState, useEffect } from "react";
import {useI18n} from "@/locales/client";

interface EmailInputProps {
    id: string
    label?: string
    sendInput: (input: { name: string; value: string }) => void
    old?:any
    disabled?: boolean
  }

export const EmailInput = ({id, label, old, disabled, sendInput}: EmailInputProps) => {
    const t = useI18n()
    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
      setInputValue(old)
    }, [old])

    function handleChange(value: string) {
        setInputValue(value)
    
        sendInput({
          name: id,
          value: value
        })
      }

      const isEmailValid = (email: string) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(email);
      };
    
      const [isInvalid, setIsInvalid] = useState(false);
    
      const handleBlur = () => {
        setIsInvalid(inputValue ? !isEmailValid(inputValue) : false);
      };

    return(
        <div className="inputContainer">
            {label && <Label>{label}</Label>}
            <Input
                type="email"
                id={id}
                value={inputValue}
                onChange={e => handleChange(e.target.value)}
                onBlur={handleBlur}
                className={`${isInvalid ? 'invalid' : ''}`}
                disabled={disabled}
            ></Input>

            {isInvalid && <div className="email-error">{t('Enter a valid email address.')}</div>}
        </div>
    )
}