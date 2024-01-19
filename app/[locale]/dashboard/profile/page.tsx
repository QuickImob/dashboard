import Breadcrumbs from "@/app/components/breadcrumbs";
import { GadgetCard } from "@/app/components/card";
import './styles.css';
import { getI18n } from "@/locales/server";
import ProfilePage from "@/app/components/profile";

export default async function Page() {
    const t = await getI18n()

  const breadCrumbs = [
    {
      label:t('Dashboard'),
      link:'/dashboard',
    },
    {
      label:t('Profile'),
      link:'/dashboard/properties',
    },
  ]

    return (
      <>
      <Breadcrumbs data={breadCrumbs}/>
      <GadgetCard className="w-full">
        <ProfilePage data={[]}/>
      </GadgetCard>
      </>
    )
  }