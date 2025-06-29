import { validationResult } from "express-validator"
import type { Request, Response, NextFunction } from "express"

export const validateFields = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Errores de validación",
      errors: errors.array(),
    })
  }
  next()
}
