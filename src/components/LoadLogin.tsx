import {FC, useEffect} from 'react'
import { useAppSelector, useAppDispatch } from '@lib/redux-hooks'
import { setUser } from '@models/redux/user'
import axios from '@lib/axios'
import CryptoJS from 'crypto-js'
import { nanoid } from 'nanoid'
import { saveUser } from '@lib/saveUser'

const LoadLogin: FC = () => {

    const user = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch()
    
    useEffect(() => {
        if(
            Object.keys(user.value).length == 0 &&
            !!localStorage.getItem("user")
        ) {
            const KEY = process.env.NEXT_PUBLIC_KEY
            const [userid, usersalt, expDate] = JSON.parse(localStorage.getItem("user") as string)

            try {
                CryptoJS.AES.decrypt(userid, KEY as string).toString(CryptoJS.enc.Utf8)
            } catch (e) {
                localStorage.removeItem("user")
                return
            }
            const testenc = CryptoJS.AES.encrypt("test", KEY as string).toString()
            const testdec = CryptoJS.AES.decrypt(testenc, KEY as string).toString(CryptoJS.enc.Utf8)

            const _id = CryptoJS.AES.decrypt(userid, KEY as string).toString(CryptoJS.enc.Utf8)
            const salt = CryptoJS.AES.decrypt(usersalt, KEY as string).toString(CryptoJS.enc.Utf8)
            const expDateNumber = parseInt(CryptoJS.AES.decrypt(expDate, KEY as string).toString(CryptoJS.enc.Utf8))

            if(Date.now() >= expDateNumber) {
                localStorage.removeItem("user")
            } else {
                saveUser(_id, salt)
            }

            axios({
                url: "/api/login",
                method: "POST",
                data: {
                    _id,
                    salt,
                }
            }).then((res) => {
                if(!!res.data.error) return

                dispatch(setUser(res.data))
            })
        }
    }, [])

    return null
}

export default LoadLogin