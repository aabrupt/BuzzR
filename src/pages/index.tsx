import type { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next'
import {useEffect} from 'react'
import Link from 'next/link'
import {useRouter, NextRouter} from 'next/router'
import { useAppSelector, useAppDispatch } from '@lib/redux-hooks'
// Layouts
import Layout from '@layouts/Default.layout'

const Home: NextPage = () => {

  const router: NextRouter = useRouter()

  return (
    <Layout title="BuzzR">
      {/* Chat */}
    </Layout>
  )
}

export default Home
