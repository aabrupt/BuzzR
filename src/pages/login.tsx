import type {NextPage} from 'next'
import { MouseEvent, useState, useEffect } from 'react'
import styles from '@styles/login.module.sass'
import axios from '@lib/axios'

const Login: NextPage = () => {

    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [error, setError] = useState<string>("")

    const send = (e: MouseEvent) => {
        e.preventDefault()

        axios({
            url: "/api/login",
            method: 'GET',
            data: {
                username,
                password
            }
        }).then(res => setError(res.data.error))
    }

    return (
        <div className={styles.container}>
            <form>
                <input type="text" name="username" value={username} onChange={e => setUsername(e.target.value)}/>
                <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
                <button onClick={send}>Submit</button>
                {!error ? null : error}
            </form>
        </div>
    )
}

export default Login