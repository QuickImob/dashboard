import { Button, Input, Label } from "reactstrap";
import { useEffect, useState } from "react";
import Select from 'react-select'
import './styles.css'
import useGet from "@/hooks/useGet";
import { useI18n } from "@/locales/client";

interface EnterpriseListInputProps {
    id: string
    label?: string
    sendInput: (input: { name: string; value: string }) => void
    old?:any
    activeNewform?:() => void;
    user:any
  }

export const EnterpriseListInput = ({id, label, sendInput, old, activeNewform, user}: EnterpriseListInputProps) => {
    const t = useI18n()  
    const [inputValue, setInputValue] = useState('')
    const {success, error, handleGet, loading} = useGet(`owners/${user?.user?.Company?.id}`);
    const [options, setOptions] = useState([])

    useEffect(() => {
      setInputValue(old)


    }, [old])

    function handleChange(value: any) {
        setInputValue(value.value)
    
        sendInput({
          name: id,
          value: value.value
        })
      }

      useEffect(() => {
        console.log(success)
    }, [success])
  
    return(
        <div className="inputContainer">
            {label && <Label>{label}</Label>}
            <div className="select-container">
                <Select
                    className="owner-select"
                    isSearchable={true}
                    options={options}
                    isClearable={true}
                    onChange={e => handleChange(e)}
                    value={inputValue}
                />
                <Button onClick={activeNewform}>{t('New building')}</Button>
            </div>
        </div>
    )
}