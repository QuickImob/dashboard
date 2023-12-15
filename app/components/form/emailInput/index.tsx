import { Input, Label } from "reactstrap";
import './styles.css';
import { useState } from "react";
import {useI18n} from "@/locales/client";

interface EmailInputProps {
    id: string
    label?: string
    sendInput: (input: { name: string; value: string }) => void
  }

export const EmailInput = ({id, label, sendInput}: EmailInputProps) => {
    const t = useI18n()
    const [inputValue, setInputValue] = useState('')

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
            <Label>{label}</Label>
            <Input
                type="email"
                id={id}
                value={inputValue}
                onChange={e => handleChange(e.target.value)}
                onBlur={handleBlur}
                className={`${isInvalid ? 'invalid' : ''}`}
            ></Input>

            {isInvalid && <div className="email-error">{t('Enter a valid email address.')}</div>}
        </div>
    )
}