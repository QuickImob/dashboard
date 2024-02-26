"use client";

import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import axios from "@/lib/axios";

export default function useGet(route?: string | null) {
  const [error, setError] = useState<any>({});
  const [success, setSuccess] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);

  async function handleGet(route: string) {
    setLoading(true);
    const session = await getSession();
    setError({});

    await axios
      .get(route, {
        headers: {
          Authorization: `Bearer ${session && session.token}`,
        },
      })
      .then((response) => {
        toast.success(response.data.success);

        setSuccess(response.data);
      })
      .catch((err) => {
        toast.error(err.response.data.message);

        setError(err.response.data.errors);
      });

    setLoading(false);
  }

  useEffect(() => {
    if (route) {
      handleGet(`${route}`).then();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { success, error, handleGet, loading };
}
