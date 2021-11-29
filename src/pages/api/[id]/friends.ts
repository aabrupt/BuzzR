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

          const you = await User.findOne({_id: req.query.id})
          if (!you.requests.includes(_id)) {
            throw 'No request error'
          }

          let requests: Array<string> = []
          for (let x in you.requests) {
              if (x != _id) {
                  requests.push(x)
              }
          }
          let contacts: Array<string> = you.contacts
          contacts.push(_id)

          await User.updateOne({_id: req.query.id}, {requests, contacts})
          const newUser = await User.findOne({_id: req.query.id})

          res.status(201).json({before: you, after: newUser})

        } catch (e: any) {
          return res.status(406).json({error: e.toString()})
        }
      }
      case "DELETE": {
        const {_id} = req.body
        try {
          if (!_id) {
              throw 'Incorrect body'
          }

          let you = await User.findOne({_id: req.query.id})

          let contacts: Array<string> = []
          for (let x in you.contacts) {
            if (x != _id) {
                contacts.push(x)
            }
          }

          await User.updateOne({_id: req.query.id}, {contacts})

          let newYou = await User.findOne({_id: req.query.id})

          res.status(201).json({before: you, after: newYou})

        } catch (e: any) {
          return res.status(406).json({error: e.toString()})
        }
      }
      default: {
        return res.status(405).json({})
      }
  }
}