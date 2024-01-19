import { Button, Input, Label } from "reactstrap";
import './styles.css';
import { useEffect, useState } from "react";
import { useI18n } from "@/locales/client";
import NewOwner from "../../newOwner";

interface OwnerProps {
    id: string
    label?: string
    sendInput: (input: { name: string; value: string }) => void
    old?:any
  }

export const OwnerInput = ({id, label, sendInput, old}: OwnerProps) => {
    const t = useI18n()
    const [inputValue, setInputValue] = useState('')
    const [newOwner, setNewOwner] = useState(false)

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
      <>
        <div className="inputContainer">
            {label && <Label>{label}</Label>}
            <div className="select-container">
              <Input
                  type="select"
                  id={id}
                  value={inputValue}
                  onChange={e => handleChange(e.target.value)}
              ></Input>
              <Button color="secondary" onClick={() => setNewOwner(!newOwner)}>
                {t('New owner')}
              </Button>
            </div>
        </div>
        <NewOwner newOwner={() => setNewOwner(!newOwner)}/>
      </>  
    )
}