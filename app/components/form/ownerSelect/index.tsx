import { Button, Input, Label } from "reactstrap";
import { useEffect, useState } from "react";
import Select from 'react-select'
import './styles.css'
import useGet from "@/hooks/useGet";
import { useI18n } from "@/locales/client";

interface OwnerListInputProps {
    id: string
    label?: string
    sendInput: (input: { name: string; value: string }) => void
    old?:any
    activeNewform?:() => void;
    user:any
    updateOwner:number
    className?:string
  }

export const OwnerListInput = ({id, className, updateOwner, label, sendInput, old, activeNewform, user}: OwnerListInputProps) => {
    const t = useI18n()  
    const [inputValue, setInputValue] = useState([])
    const {success, error, handleGet, loading} = useGet(`owners/${user?.user?.Company?.id}`);
    const [options, setOptions] = useState([])

    useEffect(() => {
      setInputValue(old)
    }, [old])

    useEffect(() => {
      if(updateOwner !== 0){
        handleGet(`owners/${user?.user?.Company?.id}`)
      }
    }, [updateOwner])

    function handleChange(value: any) {
        setInputValue(value)
    
        sendInput({
          name: id,
          value: value?.value
        })
      }

      useEffect(() => {
        if(success.length > 0){
          const newOptions = success.map((item: any) => ({
              label: item.name,
              value: item.id
          }));
          setOptions(newOptions);
        }
    }, [success])
  
    return(
        <div className="inputContainer">
            {label && <Label>{label}</Label>}
            <div className={`select-container ${className}`}>
                <Select
                    className="owner-select"
                    isSearchable={true}
                    options={options}
                    isClearable={true}
                    onChange={e => handleChange(e)}
                    value={inputValue}
                />
                <Button onClick={activeNewform}>{t('New owner')}</Button>
            </div>
        </div>
    )
}