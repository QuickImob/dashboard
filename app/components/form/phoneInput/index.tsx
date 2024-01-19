import { Input, Label } from "reactstrap";
import './styles.css';
import { useState, useEffect } from "react";

interface PhoneInputProps {
    id: string
    label?: string
    sendInput: (input: { name: string; value: string }) => void
    old?:any
  }

export const PhoneInput = ({id, label, old, sendInput}: PhoneInputProps) => {
    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
      setInputValue(old)
    }, [old])

    function formatPhoneNumber(value: string) {
      const cleanedValue = value.replace(/\D/g, '');
  
      if (cleanedValue.length <= 2) {
        return `(${cleanedValue.slice(0, 2)}`;
      } else if (cleanedValue.length <= 6) {
        return `(${cleanedValue.slice(0, 2)}) ${cleanedValue.slice(2, 6)}`;
      } else if (cleanedValue.length <= 10) {
        return `(${cleanedValue.slice(0, 2)}) ${cleanedValue.slice(2, 6)}-${cleanedValue.slice(6, 10)}`;
      }
  
      return `(${cleanedValue.slice(0, 2)}) ${cleanedValue.slice(2, 7)}-${cleanedValue.slice(7, 11)}`;
    }
  
    function handleChange(e: any) {
      const value = e.target.value;
  
      if (value.length <= 15) {
        const formattedValue = formatPhoneNumber(value);
        setInputValue(formattedValue);
  
        sendInput({
          name: id,
          value: formattedValue.replace(/\D/g, ''),
        });
      }
    }
    
    return(
        <div className="inputContainer">
            {label && <Label>{label}</Label>}
            <Input
                type="text"
                id={id}
                value={inputValue}
                onChange={handleChange}
            ></Input>
        </div>
    )
}