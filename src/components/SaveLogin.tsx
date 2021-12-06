import {FC, useEffect} from 'react'
import { useAppSelector, useAppDispatch } from '@lib/redux-hooks'
import { setUser } from '@models/redux/user'
import axios from '@lib/axios'
import CryptoJS from 'crypto-js'

const SaveLogin: FC = () => {

    const user = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch()
    
    useEffect(() => {
        if(
            Object.keys(user.value).length == 0 &&
            !!localStorage.getItem("user")
        ) {
            const [userid, salt] = JSON.parse(localStorage.getItem("user") as string)
            axios({
                url: "/api/login",
                method: "POST",
                data: {
                    _id: CryptoJS.AES.decrypt(userid, process.env.KEY as string).toString(CryptoJS.enc.Utf8),
                    salt: CryptoJS.AES.decrypt(salt, process.env.KEY as string).toString(CryptoJS.enc.Utf8),
                }
            }).then((res) => {
                if(!!res.data.error) return console.error(res.data.error)

                dispatch(setUser(res.data))
            })
        }
    }, [])

    return null
}

export default SaveLogin