import { Application, Response, Request } from 'express'
import _ from 'lodash'
import User from '../../models/user'
import { issue, mapProfile2User } from './helper'
import { userService } from '../../services'

const oauth = (app: Application) => {
  app.post('/auth/register', async (req: Request, res: Response) => {
    try {
      const { email, firstName, lastName, password, username } = req.body

      let user = await userService.getOne({ cond: { username } })
      if (user) {
        throw new Error('INVALID_USER')
      }
      user = await userService.signUp({
        email,
        username,
        firstName,
        lastName,
        password: User.generateHash(password)
      } as any)

      const data = await mapProfile2User(
        {
          id: user._id,
          provider: 'unknown',
          loginClientIp: req.clientIp,
        },
        (req.query.scope as string) || 'mobile'
      )

      return res.status(200).json({ success: true, user: data })
    } catch (err) {
      console.log(err)
      res.status(403).json({
        success: false,
        code: 403,
        message: err.message,
      })
    }
  })

  app.post('/auth/login', async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body

      const user = await userService.getOne({
        cond: {
          $or: [{ email }],
        },
      })
      if (!user || !User.validPassword(password, user.password)) {
        throw new Error('INVALID_USER')
      }
      const data = await mapProfile2User(
        {
          id: user._id,
          provider: 'unknown',
          loginClientIp: req.clientIp,
        },
        (req.query.scope as string) || 'mobile'
      )
      return res.status(200).json({ success: true, data, title })
    } catch (err) {
      console.log(err)
      res.status(401).json({
        success: false,
        code: 401,
        message: err.message,
      })
    }
  })

}

export default oauth
