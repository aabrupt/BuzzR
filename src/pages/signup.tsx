import type {NextPage} from 'next'
import Head from 'next/head'
import styles from '@styles/form.module.sass'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import axios from '@lib/axios'

const SignUp: NextPage = () => {

    const [username, setUsername] = useState<string>("")
    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [passwordCheck, setPasswordCheck] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [error, setError] = useState<string|null>(null)
    const [showPass, setShowPass] = useState<boolean>(false)
    const [showPassCheck, setShowPassCheck] = useState<boolean>(false)


    const send = (e: React.MouseEvent) => {
        e.preventDefault()

        if (password != passwordCheck) {
            setError("Passwords does not match")
            return
        }

        axios({
            method: 'POST',
            url: '/api/signup',
            data: {
                username,
                name: firstName,
                email,
                lastname: lastName,
                password,
            }
        }).then(res => setError(res.data.error))
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <form>
                    <div>
                        <input type="text" name="username" value={username} onChange={e => setUsername(e.target.value)}/>
                        <label htmlFor="username">Username</label>
                    </div>
                    <div>
                        <input type="text" name="firstname" value={firstName} onChange={e => setFirstName(e.target.value)}/>
                        <label htmlFor="firstname">Firstname</label>
                    </div>
                    <div>
                        <input type="text" name="lastname" value={lastName} onChange={e => setLastName(e.target.value)}/>
                        <label htmlFor="lastname">Lastname</label>
                    </div>
                    <div>
                        <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} />
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className={styles.password}>
                        <input type={showPass ? "text" : "password"} name="password" value={password} onChange={e => setPassword(e.target.value)} />
                        <label htmlFor="password">Password</label>
                        <button onClick={e => {
                            e.preventDefault()
                            setShowPass(!showPass)
                        }} tabIndex={-1} >{showPass ? "Hide":"Show"}</button>
                    </div>
                    <div className={styles.password}>
                        <input type={showPassCheck ? "text" : "password"} name="passwordCheck" value={passwordCheck} onChange={e => setPasswordCheck(e.target.value)} />
                        <label htmlFor="passwordCheck">Password again</label>
                        <button onClick={e => {
                            e.preventDefault()
                            setShowPassCheck(!showPassCheck)
                        }} tabIndex={-1} >{showPassCheck ? "Hide":"Show"}</button>
                    </div>
                    <button onClick={e => send(e)}>Submit</button>
                </form>
                <p className={styles.error}>{error}</p>
                <p className={styles.change}>Already have an account? <Link href="/login">Login</Link></p>
            </div>
        </div>
    )
}

export default SignUp