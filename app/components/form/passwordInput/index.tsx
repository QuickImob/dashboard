import './styles.css'
import {useState} from 'react';
import { Input, Label } from "reactstrap";
import {AiFillEye, AiFillEyeInvisible} from 'react-icons/ai';

interface PasswordInputProps {
    id: string
    label?: string
    sendInput: (input: { name: string; value: string }) => void
  }

export const PasswordInput = ({id, label, sendInput}: PasswordInputProps) => {

  const [inputValue, setInputValue] = useState('')

  function handleChange(value: string) {
    setInputValue(value)

    sendInput({
      name: id,
      value: value
    })
  }

  const [viewPass, setViewPass] = useState(false)

  return (
    <div className="inputContainer">
      {label && <Label>{label}</Label>}

      <Input
        type={viewPass ? "text" : "password"}
        id={id}
        value={inputValue}
        onChange={e => handleChange(e.target.value)}
      />

      <div className="viewPass" onClick={() => setViewPass(!viewPass)}>
        {!viewPass ?
          <AiFillEye size="1.4rem" />
          :
          <AiFillEyeInvisible size="1.4rem"/>
        }
      </div>

    </div>
  )
}