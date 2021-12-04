import type { NextApiRequest, NextApiResponse } from 'next'
import {User} from '@models/mongoose'
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

            if(!_id) {
                throw 'Incorrect body'
            }

            const user = await User.findOne({_id})

            if (!user) {
                throw 'No matching user'
            }

            return res.status(200).json({_id: user._id, username: user.username, icon: user.icon})
            
            } catch (e: any) {
            return res.status(406).json({error: e.toString()})
            }
        }
        case 'DELETE': {
            const {_id, salt} = req.body
            try {
            if(!_id || !salt) {
                throw 'Incorrect body'
            } else {
                console.log("starting finding user...")
                const user = await User.findOne({_id, salt})

                if (!user) {
                    throw 'No matching user'
                }

                await User.deleteOne({_id, salt})

                return res.status(201).json({deletedUser: user})
            }
            } catch (e: any) {
            return res.status(406).json({error: e.toString()})
            }
        }
        default: {
            return res.status(405).json({})
        }
    }
}