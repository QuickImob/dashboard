import {useEffect, useState} from 'react';
import './styles.css';

interface IncrementalInputProps {
    id: string
    label?: string
    sendInput: (input: { name: string; value: string }) => void
    old?:any
}

export const IncrementalInput = ({id, label, sendInput, old}: IncrementalInputProps) => {
  const [inputValue, setInputValue] = useState('0');

  useEffect(() => {
    if(old){
        setInputValue(old)
    }
  }, [old])

  function handleChange(value: string | number) {
    const parsedValue = typeof value === 'string' ? parseInt(value, 10) : value;
    const newValue = Math.max(parsedValue, 0);

    setInputValue(String(newValue));

    sendInput({
      name: id,
      value: value.toString()
    })
  }

  return (
    <div className="inputContainer">
      {label && <label>{label}</label>}

      <div className="incremental-container">
        <button className="prev" onClick={() => handleChange(parseInt(inputValue) - 1)}>-</button>
        <input
          id={id}
          type="number"
          value={parseInt(inputValue)}
          onChange={e => handleChange(e.target.value)}
        ></input>
        <button className="next" onClick={() => handleChange(parseInt(inputValue) + 1)}>+</button>
      </div>

    </div>
  );
};