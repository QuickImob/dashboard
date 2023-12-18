import { Input, Label } from "reactstrap";
import './styles.css';
import { useState } from "react";

interface EmailInputProps {
    id: string
    label?: string
    sendInput: (input: { name: string; value: string }) => void
  }

export const TextInput = ({id, label, sendInput}: EmailInputProps) => {
    const [inputValue, setInputValue] = useState('')

    function handleChange(value: string) {
        setInputValue(value)
    
        sendInput({
          name: id,
          value: value
        })
      }
    

    return(
        <div className="inputContainer">
            <Label>{label}</Label>
            <Input
                type="text"
                id={id}
                value={inputValue}
                onChange={e => handleChange(e.target.value)}
            ></Input>
        </div>
    )
}