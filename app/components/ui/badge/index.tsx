import './styles.css'
import { getI18n } from '@/locales/server';

interface UiBadgeProps {
    status:string;
}

export default async function UiBadget({status}: UiBadgeProps) {
  const t = await getI18n()

  return (
    <>
      <div className={`${status} badge`}>
        {status === 'active' && t('Active')}
        {status === 'inactive' && t('Inactive')}
      </div>
    </>
  )
}
