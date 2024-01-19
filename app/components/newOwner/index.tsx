import { Button } from 'reactstrap';
import './styles.css';
import useFields from '@/hooks/useFields';
import usePost from '@/hooks/usePost';
import { TextInput } from '../form/textInput';
import { useI18n } from '@/locales/client';
import { EmailInput } from '../form/emailInput';
import { PhoneInput } from '../form/phoneInput';
import {useRouter} from "next/navigation";
import axios from "@/lib/axios";

interface NewOwnerProps {
  newOwner:() => void;
}

function NewOwner({newOwner}: NewOwnerProps) {
  const t = useI18n()
  const router = useRouter()
  const {success, error, handlePost, handlePut, loading} = usePost();

  const {fields, handleFields} = useFields({
      name:'',
      email:'',
      phone:'',
      company_id:'',
    })

    const submitForm = async () => {
      try {
          await axios.post('users', fields);
          newOwner()
      } catch (error) {
          console.error('Erro ao registrar:', error);
      }
  };

  return (
    <>
      <TextInput
          id='name'
          label={t('Name')}
          sendInput={handleFields}
      />
      <EmailInput
          id='email'
          label={t('Email')}
          sendInput={handleFields}
      />
      <PhoneInput
          id='phone'
          label={t('Phone')}
          sendInput={handleFields}
      />
      <Button onClick={submitForm}>{t('Send')}</Button>
    </>
  );
}

export default NewOwner;