import type { NextPage, GetServerSideProps, InferGetServerSidePropsType } from 'next'
import {useEffect} from 'react'
import Link from 'next/link'
import {useRouter, NextRouter} from 'next/router'
import { useAppSelector, useAppDispatch } from '@lib/redux-hooks'
// Layouts
import Layout from '@layouts/Default.layout'
import { STATES } from 'mongoose'
import { getRouteRegex } from 'next/dist/shared/lib/router/utils'

const Home: NextPage = () => {

  const router: NextRouter = useRouter()
  const user = useAppSelector((state) => state.user)

  useEffect(() => {
    router.prefetch("/login")
    
    if(Object.keys(user.value).length == 0) {
      router.push("/login")
    }


  }, [])

  return (
    <Layout title="BuzzR">
      {/* Chat */}
    </Layout>
  )
}

export default Home
