'use client';

import { useSelector, useDispatch } from 'react-redux';
import { GadgetCard } from "@/app/components/card";
import {setOpen} from '@/app/server/redux/actions';
import { useEffect } from 'react';
import './styles.css';
import { NewPropertyForm } from '@/app/components/newPropertyForm';

export default function Page() {
  const open = useSelector((state: any) => state.open);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setOpen(!open));
  }, [])

    return (
      <>
      <GadgetCard className="w-full h-full">
        <NewPropertyForm/>
      </GadgetCard>
      </>
    )
  }