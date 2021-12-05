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

            const chats = Chat.find({members: {$in: [_id]}})

            return res.status(200).json(chats)
            
            } catch (e: any) {
            return res.status(406).json({error: e.toString()})
            }
        }
        case "PUT": {
            const {ids, name} = req.body
            try {
            
            if (!ids || ids.length == 0 || !name) {
                throw 'Incorrect body'
            }

            const chats = Chat.create({members: ids})

            return res.status(200).json(chats)
            
            } catch (e: any) {
            return res.status(406).json({error: e.toString()})
            }
        }
        case "DELETE": {
            const {_id, salt} = req.body
            try {
            
            if (!_id || !salt) {
                throw 'Incorrect body'
            }

            Chat.deleteOne({_id, salt})

            return res.status(200).json({deleteID: _id})
            
            } catch (e: any) {
            return res.status(406).json({error: e.toString()})
            }
        }
        default: {
            return res.status(405).json({})
        }
    }
}