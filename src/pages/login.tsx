import type {NextPage, GetServerSideProps, InferGetServerSidePropsType} from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { MouseEvent, useState, useEffect } from 'react'
import styles from '@styles/form.module.sass'
import axios from '@lib/axios'
import CryptoJS from 'crypto-js'
import SaveLogin from '@components/SaveLogin'
// Redux
import { useAppSelector, useAppDispatch } from '@lib/redux-hooks'
import {setUser} from '@models/redux/user'

const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {KEY: process.env.KEY as string}
    }
}

const Login: NextPage = (data: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    const router = useRouter()

    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [showPass, setShowPass] = useState<boolean>(false)
    const [error, setError] = useState<string>("")

    const user = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch()

    useEffect(() => {

        router.prefetch("/")

        if (Object.keys(user.value).length != 0) {
            router.push("/")
        }
    }, [])

    useEffect(() => {
        if (Object.keys(user.value).length != 0) {
            router.push("/")
        }
    }, [user.value])

    const send = async (e: MouseEvent) => {
        e.preventDefault()

        const res = await axios({
            url: "/api/login",
            method: 'POST',
            data: {
                username,
                password
            }
        })

        setError(!!res.data.error ? res.data.status == 406 ? 'Incorrect username or password' : 'Error submitting data' : '')

        dispatch(setUser(res.data))
        console.log(data)
        localStorage.setItem("user", JSON.stringify([CryptoJS.AES.encrypt(res.data._id, data.KEY as string), CryptoJS.AES.encrypt(res.data.salt, data.KEY as string)]))
    }

    const showPassClick = (e: MouseEvent) => {
        e.preventDefault()

        setShowPass(!showPass)
    }

    return (
        <div className={styles.container}>
            <SaveLogin />
            <div className={styles.card}>
                <form>
                    <input type="text" name="username" value={username} onChange={e => setUsername(e.target.value)}/>
                    <div className={styles.password}>
                        <input type={showPass ? "text" : "password"} name="password" value={password} onChange={e => setPassword(e.target.value)} />
                        <button onClick={showPassClick}>{showPass ? "Hide":"Show"}</button>
                    </div>
                    <button onClick={send} tabIndex={0}>Submit</button>
                </form>
                <p className={styles.error}>{error}</p>
                <p className={styles.change}>Don't have an account? <Link href="/signup">Sign up</Link></p>
            </div>
        </div>
    )
}

export default Login