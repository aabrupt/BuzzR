import type {NextPage} from 'next'
import Head from 'next/head'
import styles from '@styles/signup.module.sass'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import axios from '@lib/axios'

const SignUp: NextPage = () => {

    const [username, setUsername] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordCheck, setPasswordCheck] = useState<string>("");
    const [error, setError] = useState<string|null>(null);

    const send = (e: React.MouseEvent) => {
        e.preventDefault()

        axios({
            method: 'POST',
            url: '/api/signup',
            data: {
                username,
                firstName,
                lastName,
                password,
                passwordCheck,
            }
        }).then(res => setError(res.data.error))
    }

    return (
        <div className={styles.container}>
            <form>
                <input type="text" name="username" value={username} onChange={e => setUsername(e.target.value)}/>
                <input type="text" name="firstname" value={firstName} onChange={e => setFirstName(e.target.value)}/>
                <input type="text" name="lastname" value={lastName} onChange={e => setLastName(e.target.value)}/>
                <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)}/>
                <input type="password" name="passwordCheck" value={passwordCheck} onChange={e => setPasswordCheck(e.target.value)}/>
                <button onClick={e => send(e)}>Submit</button>
                {!error ? null : <p>{error}</p>}

            </form>
        </div>
    )
}

export default SignUp