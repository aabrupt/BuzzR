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
        const {username, password} = req.body
        try {
          if(!username || !password) {
            throw 'Incorrect body'
          } else {
            const user = await User.findOne({
              username,
              password: Buffer.from(password).toString('base64')
            })

            if (!user) {
              throw 'No matching user'
            }

            return res.status(200).json(user)
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