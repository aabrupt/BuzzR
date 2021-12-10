import type { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next'
import {useEffect, useState} from 'react'
import Link from 'next/link'
import {useRouter, NextRouter} from 'next/router'
import { useAppSelector, useAppDispatch } from '@lib/redux-hooks'
// Components
import LoadLogin from '@components/LoadLogin'
import Head from 'next/head'
import Navbar from '@components/Navbar'
import Footer from '@components/Footer'
import Chats from '@components/Chats'
import Chat from '@components/Chat'
import Friends from '@components/Friends'

const Home: NextPage = () => {

  const router: NextRouter = useRouter()
  const user = useAppSelector((state) => state.user)
  const userLoaded = useAppSelector((state) => state.userLoaded)

  const [page, setPage] = useState<string>("chats")
  const [currentChat, setCurrentChat] = useState<string>()

  useEffect(() => {
    router.prefetch("/login")
    
    if(Object.keys(user.value).length == 0) {
      router.push("/login")
    }


  }, [])

  return (
    <>
      <LoadLogin />
        
    { userLoaded.value?
    <>
      <Head>
          <title>BuzzR</title>
          <link href="/Source_Sans_Pro/SourceSansPro-Black" ref="stylesheet" />
          <link href="/Source_Sans_Pro/SourceSansPro-Bold" ref="stylesheet" />
          <link href="/Source_Sans_Pro/SourceSansPro-Extralight" ref="stylesheet" />
          <link href="/Source_Sans_Pro/SourceSansPro-Regular" ref="stylesheet" />
          <link href="/Source_Sans_Pro/SourceSansPro-Light" ref="stylesheet" />
          <link href="/Source_Sans_Pro/SourceSansPro-Semibold" ref="stylesheet" />
      </Head>

      <Navbar setPage={setPage}/>

      <main>
        {
          page == "chats" ?
          <Chats />:
          page == "chat"?
          <Chat />:
          page == "friends"?
          <Friends />
          :null
        }
      </main>

      <Footer />
      </>:null}
    </>
  )
}

export default Home
