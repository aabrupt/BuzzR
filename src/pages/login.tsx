import type {NextPage} from 'next'
import Link from 'next/link'
import { MouseEvent, useState, useEffect } from 'react'
import styles from '@styles/form.module.sass'
import axios from '@lib/axios'

const Login: NextPage = () => {

    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [showPass, setShowPass] = useState<boolean>(false)
    const [error, setError] = useState<string>("")

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
    }

    const showPassClick = (e: MouseEvent) => {
        e.preventDefault()

        setShowPass(!showPass)
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <form>
                    <input type="text" name="username" value={username} onChange={e => setUsername(e.target.value)}/>
                    <div className={styles.password}>
                        <input type={showPass ? "text" : "password"} name="password" value={password} onChange={e => setPassword(e.target.value)} />
                        <button onClick={showPassClick}  tabIndex={-1}>{showPass ? "Hide":"Show"}</button>
                    </div>
                    <button onClick={send}>Submit</button>
                </form>
                <p className={styles.error}>{error}</p>
                <p className={styles.change}>Don't have an account? <Link href="/signup">Sign up</Link></p>
            </div>
        </div>
    )
}

export default Login