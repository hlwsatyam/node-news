import { errorHandler } from "./error.js"
import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {
  const token = req.body.access_token
  
 console.log(req.body)
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
