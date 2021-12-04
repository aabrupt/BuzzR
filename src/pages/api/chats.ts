import type { NextApiRequest, NextApiResponse } from 'next'
import {Chat} from '@models/mongoose'
import dbConnection from '@lib/dbConnection'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    dbConnection()
    switch(req.method) {
        case "GET": {
            const {_id} = req.body
            try {
            
            if (!_id) {
                throw 'Incorrect body'
            }

            const chats = Chat.find({members: [_id]})

            return res.status(200).json(user)
            
            } catch (e: any) {
            return res.status(406).json({error: e.toString()})
            }
        }
        default: {
            return res.status(405).json({})
        }
    }
}