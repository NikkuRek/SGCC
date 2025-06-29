import { check } from "express-validator"
import type { NextFunction, Request, Response } from "express"

export class CensoValidator {
  validateFields = [
    check("anio_censo", "El año del censo es obligatorio").not().isEmpty(),
    check("anio_censo", "El año del censo debe ser un número entero").isInt(),
    check("anio_censo", "El año del censo debe ser mayor a 1900").isInt({ min: 1900 }),
    check("anio_censo", "El año del censo no puede ser mayor al año actual + 1").isInt({
      max: new Date().getFullYear() + 1,
    }),

    check("descripcion", "La descripción debe tener máximo 255 caracteres").optional().isLength({ max: 255 }),

    check("fecha_inicio", "La fecha de inicio debe ser una fecha válida").optional().isISO8601().toDate(),

    check("fecha_fin", "La fecha de fin debe ser una fecha válida").optional().isISO8601().toDate(),
  ]

  validateDateRange = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { fecha_inicio, fecha_fin } = req.body

      if (fecha_inicio && fecha_fin) {
        const fechaInicio = new Date(fecha_inicio)
        const fechaFin = new Date(fecha_fin)

        if (fechaInicio >= fechaFin) {
          return res.status(400).json({
            message: "La fecha de inicio debe ser anterior a la fecha de fin",
          })
        }
      }

      next()
    } catch (error) {
      console.error("Error al validar rango de fechas:", error)
      return res.status(500).json({
        message: "Error interno del servidor al validar fechas",
      })
    }
  }
}

export const censoValidator = new CensoValidator()
