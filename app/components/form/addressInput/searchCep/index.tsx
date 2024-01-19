import { Input, Label } from "reactstrap";
import './styles.css';
import { useState } from "react";

interface EmailInputProps {
  id: string;
  label?: string;
  sendInput: (input: { name: string; value: string }) => void;
  sendData: (data: any) => void;
}

export const SearchCep = ({ id, label, sendInput, sendData }: EmailInputProps) => {
  const [inputValue, setInputValue] = useState('');

  async function handleSearchCep(cep: string) {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        console.error('Erro ao buscar CEP:', data.erro);
        return;
      }

      sendData(data);
    } catch (error) {
      console.error('Erro na requisição do CEP:', error);
    }
  }

  async function handleChange(value: string) {
    setInputValue(value);

    const cepRegex = /^\d{5}-?\d{3}$/;
    if (cepRegex.test(value)) {
      await handleSearchCep(value);
    }

  }

  return(
    <div className="inputContainer">
        {label && <Label>{label}</Label>}
        <Input
            type="text"
            id={id}
            value={inputValue}
            onChange={e => handleChange(e.target.value)}
        ></Input>
    </div>
)
}