import type { NextPage } from 'next'
import Link from 'next/link'
import {useRouter, NextRouter} from 'next/router'
// Layouts
import Layout from '@layouts/Default.layout'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const Home: NextPage = () => {

  const router: NextRouter = useRouter()

  return (
    <Layout title="BuzzR">
      <Link href={{pathname: "/logout"}}>Log out</Link>
      {/* Chat */}
    </Layout>
  )
}

export default Home
