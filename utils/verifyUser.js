import { errorHandler } from "./error.js"
import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token
 console.log(req.cookies)
  if (!token) {
    
    return next(errorHandler(401, "Unauthorized"))
  }

  jwt.verify(token, "sdsdsss", (err, user) => {
    if (err) {
      console.log( err)
      return next(errorHandler(401, "Unauthorized"))
    }

    req.user = user

    next()
  })
}
