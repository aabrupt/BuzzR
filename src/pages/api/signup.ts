import type { NextApiRequest, NextApiResponse } from 'next'
import {User} from '@models/mongoose'
import dbConnection from '@lib/dbConnection'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    dbConnection()
    switch(req.method) {
        case 'POST': {
            try {
                const {username, password, name, lastname, email, dob, _id, logs, state} = req.body
                
                console.log(!username, 
                    !password,
                    !name,
                    !lastname,
                    !email,
                    dob,
                    _id,
                    logs,
                    state,
                    !(email as string).match(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/))

                if (!username || 
                    !password || 
                    !name || 
                    !lastname || 
                    !email || 
                    dob || 
                    _id || 
                    logs || 
                    state ||
                    !(email as string).match(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/)
                ) {
                    throw 'Incorrect body'
                }

                await User.create({
                    username,
                    password: Buffer.from(password).toString('base64'),
                    name,
                    lastname,
                    email,
                })

                const user = await User.findOne({
                    username,
                    password: Buffer.from(password).toString('base64'),
                    name,
                    lastname,
                    email,
                })

                return res.status(201).json(user)
            } catch (e: any) {
                return res.status(200).json({error: e.toString(), status: 406})
            }
        }
        default: {
            return res.status(405).json({})
        }
    }
}