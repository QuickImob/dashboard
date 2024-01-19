'use client'

import {useState} from "react";
import axios from "@/lib/axios";
import {getSession} from "next-auth/react";

export default function usePost() {
  const [error, setError] = useState<any>({})
  const [success, setSuccess] = useState<any>({})
  const [loading, setLoading] = useState<boolean>(false)

  async function handlePost(route: string, fields = {}) {
    setLoading(true)
    const session = await getSession()
    setError({})

    await axios.post(route, fields, {
      headers: {
        Authorization: `Bearer ${session && session.token}`,
      },
    })
      .then((response) => {

        setSuccess(response.data)
      })
      .catch((err) => {

        setError(err.response?.data.errors)
      })

    setLoading(false)
  }

  async function handlePut(route: string, fields = {}) {
    setLoading(true)
    const session = await getSession()
    setError({})

    await axios.put(route, fields, {
      headers: {
        Authorization: `Bearer ${session && session.token}`,
      },
    })
      .then((response) => {

        setSuccess(response.data)
      })
      .catch((err) => {

        setError(err.response?.data.errors)
      })

    setLoading(false)
  }

  return {success, error, handlePost, handlePut, loading}
}
