import { Input, Label } from "reactstrap";
import './styles.css';
import { useEffect, useState } from "react";

interface EmailInputProps {
    id: string
    label?: string
    sendInput: (input: { name: string; value: string }) => void
    old?:any
    className?:string
  }

export const TextInput = ({id, label, sendInput, old, className}: EmailInputProps) => {
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
    

    return(
        <div className="inputContainer">
            {label && <Label>{label}</Label>}
            <Input
                type="text"
                id={id}
                className={className}
                value={inputValue}
                onChange={e => handleChange(e.target.value)}
            ></Input>
        </div>
    )
}