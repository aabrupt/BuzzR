import type { NextApiRequest, NextApiResponse } from 'next'
import {User} from '@models/mongoose'
import dbConnection from '@lib/dbConnection'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  dbConnection()
  switch(req.method) {
      case "PUT": {
        const {_id} = req.body
        try {
          if (!_id) {
              throw 'Incorrect body'
          }

          let user = await User.findOne({_id})

          user.requests.push(req.query.id)

          await User.updateOne({_id}, {requests: user.requests})

          return res.status(201).json({user})

        } catch (e: any) {
          return res.status(406).json({error: e.toString()})
        }
      }
      default: {
        return res.status(405).json({})
      }
  }
}