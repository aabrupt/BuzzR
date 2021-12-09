import CryptoJS from 'crypto-js'

export const saveUser = (_id: string, salt: string) => {
        
    const KEY = process.env.NEXT_PUBLIC_KEY

    if (!!KEY) {
        localStorage.setItem("user", 
        JSON.stringify([
            CryptoJS.AES.encrypt(_id, KEY).toString(),
            CryptoJS.AES.encrypt(salt, KEY).toString(), 
            CryptoJS.AES.encrypt((Date.now() + 24 * 60 * 60 * 1000).toString(), KEY).toString(),
        ]))
    }
}