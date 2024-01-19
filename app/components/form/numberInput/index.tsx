import { Input, Label } from "reactstrap";
import './styles.css';
import { useState } from "react";

interface NumberInputProps {
    id: string
    label?: string
    sendInput: (input: { name: string; value: string }) => void
  }

export const NumberInput = ({id, label, sendInput}: NumberInputProps) => {
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
            {label && <Label>{label}</Label>}
            <Input
                type="number"
                id={id}
                value={inputValue}
                onChange={e => handleChange(e.target.value)}
            ></Input>
        </div>
    )
}