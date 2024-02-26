import {useEffect, useState} from 'react';
import { useCurrentLocale } from '@/locales/client';
import { Input, Label } from 'reactstrap';

interface CurrencyInputProps {
    id: string
    label?: string
    sendInput: (input: { name: string; value: string }) => void
    old?:any
}

export const CurrencyInput = ({id, label, sendInput, old}: CurrencyInputProps) => {
  const locale: "pt-BR" | "en" | "es" = useCurrentLocale()
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue(old)
  }, [old])
  
  function getCurrencyCode(locale: string): string {
    const currencyCodes: Record<string, string> = {
      'pt-BR': 'BRL',
      'en': 'USD',
      'es': 'EUR',
    };

    return currencyCodes[locale] || 'USD';
  }

  function formatCurrency(value: number, currencyCode: string): string {
    if (isNaN(value)) {
      return '';
    }
  
    const formattedValue = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
    }).format(value);
  
    return formattedValue;
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const rawValue = event.target.value;
    const numericValue = parseFloat(rawValue.replace(/[^\d]/g, '')); // Remove caracteres não numéricos
  
    setInputValue(formatCurrency(numericValue / 100, getCurrencyCode(locale)));
  
    sendInput({
      name: id,
      value: String((numericValue / 100).toFixed(2)),
    });
  }

  return (
    <fieldset>
      {label && <Label>{label}</Label>}

      <Input
        id={id}
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="R$ 0,00"
      ></Input>

    </fieldset>
  );
};