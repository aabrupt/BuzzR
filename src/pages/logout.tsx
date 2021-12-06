import type {NextPage, GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType} from 'next'
import styles from '@styles/logout.module.sass'
import Link from 'next/link'
import axios from '@lib/axios'
import {useRouter, NextRouter} from 'next/router'
import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@lib/redux-hooks'
import { setUser } from '@models/redux/user'

const Logout: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({data, error, query, url}) => {
    const router: NextRouter = useRouter()
    const user = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (data != null) {
            setTimeout(() => {
                router.back()
            }, 7000)
        }
        dispatch(setUser({}))
        localStorage.removeItem("userid")
    }, [])

    return (
        <div className={styles.container}>
            <h1>
                {error ? "500": !data ? "Loading..." : "You have now been logged out"}
            </h1>
            {error ? 
            <p>An error has occured while logging you out.</p> : 
            <p>If you do not get redirected after 7 seconds please press <a onClick={e => router.back()}>this</a>.</p>}
        </div>
    )
}


export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {

    const query = context.query

    const res = await axios((context.req.headers['x-forwarded-proto'] || "http") + "://" + (context.req.headers.host || "localhost:3000") + "/api/logout").catch((e) => e.toJSON())
    const error = res.status > 400
    const data = error ? null : res.data;

    context.res.statusCode = 500

    return {props: {query, data, error, url:context.resolvedUrl}}

}

export default Logout