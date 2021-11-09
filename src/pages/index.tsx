import type { NextPage, GetServerSidePropsContext, InferGetServerSidePropsType} from 'next'
import Layout from '@layouts/Default.layout'

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  let data = ""

  return ({
    data,
  })
}

const Home: NextPage = ({data}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Layout title="Home">

    </Layout>
  )
}

export default Home
