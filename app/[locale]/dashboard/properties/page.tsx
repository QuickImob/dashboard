import Breadcrumbs from "@/app/components/breadcrumbs";
import { GadgetCard } from "@/app/components/card";
import PropertiesList from "@/app/components/properties/list";
import { getI18n } from "@/locales/server";
import { IoAdd } from "react-icons/io5";

export default async function Page() {
  const t = await getI18n()

  const breadCrumbs = [
    {
      label:t('Dashboard'),
      link:'/dashboard',
    },
    {
      label:t('Your properties'),
      link:'/dashboard/properties',
    },
  ]

  const breadActions = [
    {
      label:t('New property'),
      icon:<IoAdd />,
    },
  ]

    return (
      <>
      <Breadcrumbs data={breadCrumbs} actions={breadActions}/>
      <GadgetCard className="w-full">
        <PropertiesList data={[]}/>
      </GadgetCard>
      </>
    )
  }