import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    switch(req.method) {
        case "GET": {
          return res.
        }
        default: {
          return res.status(405).json({})
        }
    }
  res.status(200).json({error: "Incorrect username or password"})
}