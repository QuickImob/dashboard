import { Button, Label } from "reactstrap";
import './styles.css';
import { useState } from "react";

interface Option {
  label: string;
  value: string;
  icon: any;
}

interface ToogleButtonsInputProps {
    id: string
    label?: string
    options: Option[]
    sendInput: (input: { name: string; value: string }) => void
  }

export const ToogleButtonsInput = ({id, label, options, sendInput}: ToogleButtonsInputProps) => {
    const [selectedOption, setSelectedOption] = useState<Option | null>(null)

    function handleChange(option: Option) {
      setSelectedOption(option);
      
      sendInput({
        name: id,
        value: option.value,
      });
    }
    

    return(
      <div className="inputContainer">
        <Label>{label}</Label>
        <div className="buttons-container">
          {options.map((option, index) => (
            <Button key={index} color={`${selectedOption?.value === option.value ? 'primary' : 'secondary'}`} onClick={() => handleChange(option)}>
              {option.label}
            </Button>
          ))}
        </div>
      </div>
    )
}