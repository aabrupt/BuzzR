import type { NextApiRequest, NextApiResponse } from 'next'
import {User} from '@models/mongoose'
import dbConnection from '@lib/dbConnection'
import CryptoJS from 'crypto-js'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  dbConnection()
  switch(req.method) {
      case "POST": {
        const {username, password, _id, salt} = req.body
        try {
          let user

          if((!username || !password) && (!_id || !salt)) {
            throw 'Incorrect body'
          } else if (!_id || !salt) {
            user = await User.findOne({
              username,
              password: CryptoJS.SHA512(password + process.env.SALT).toString(CryptoJS.enc.Base64)
            })
          } else {
            user = await User.findOne({
              _id,
              salt
            })
          }

          if (!user) {
            throw 'No matching user'
          }

          return res.status(200).json(user)
        } catch (e: any) {
          return res.status(200).json({error: e.toString(), status: 406})
        }
      }
      default: {
        return res.status(405).json({})
      }
  }
}