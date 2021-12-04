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
        const {_id, salt} = req.body
        try {
          if (!_id || !salt) {
              throw 'Incorrect body'
          }

          const you = await User.findOne({_id: req.query.id})
          if (!you) {
            throw 'Cannot find user'
          }

          if (!you.requests.includes(_id)) {
            throw 'No request error'
          }
          if (salt != you.salt) {
            throw 'Incorrect user'
          }

          let requests = you.requests.filter((x: any) => x != _id)

          let contacts: Array<string> = you.contacts
          contacts.push(_id)

          await User.updateOne({_id: req.query.id}, {requests, contacts})

          return res.status(201).json({contacts, requests})

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

          let you = await User.findOne({_id: req.query.id})

          if (!you) {
            throw 'Cannot find user'
          }
          
          if (salt != you.salt) {
            throw 'Incorrect user'
          }

          let contacts = you.contacts.filter((x: any) => x != _id)
          let requests = you.requests.filter((x: any) => x != _id)

          await User.updateOne({_id: req.query.id}, {contacts, requests})

          res.status(201).json({contacts, requests})

        } catch (e: any) {
          return res.status(406).json({error: e.toString()})
        }
      }
      default: {
        return res.status(405).json({})
      }
  }
}