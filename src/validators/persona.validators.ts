import { check } from "express-validator"
import type { NextFunction, Request, Response } from "express"
import { PersonaDB } from "../config/sequelize.config"

export class PersonaValidator {
  validateFields = [
    check("cedula", "La cédula es obligatoria").not().isEmpty(),
    check("cedula", "La cédula debe contener solo números").isNumeric(),
    check("cedula", "La cédula debe tener entre 7 y 15 caracteres").isLength({ min: 7, max: 15 }),

    check("nombres", "Los nombres son obligatorios").not().isEmpty(),
    check("nombres", "Los nombres deben contener solo letras y espacios")
      .isString()
      .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/),
    check("nombres", "Los nombres deben tener máximo 100 caracteres").isLength({ max: 100 }),

    check("apellidos", "Los apellidos son obligatorios").not().isEmpty(),
    check("apellidos", "Los apellidos deben contener solo letras y espacios")
      .isString()
      .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/),
    check("apellidos", "Los apellidos deben tener máximo 100 caracteres").isLength({ max: 100 }),

    check("fecha_nacimiento", "La fecha de nacimiento debe ser una fecha válida").optional().isISO8601().toDate(),

    check("sexo", "El sexo debe ser M, F u Otro").optional().isIn(["M", "F", "Otro"]),

    check("telefono", "El teléfono debe contener solo números y espacios")
      .optional()
      .matches(/^[0-9\s\-+$$$$]+$/),
    check("telefono", "El teléfono debe tener máximo 20 caracteres").optional().isLength({ max: 20 }),
  ]

  validateCedulaExists = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cedulaFromBody = req.body.cedula
      const idFromParams = req.params.id

      if (!cedulaFromBody) {
        return next()
      }

      const personaWithCedula = await PersonaDB.findOne({ where: { cedula: cedulaFromBody } })

      if (!personaWithCedula) {
        return next()
      }

      if (req.method.toLowerCase() === "put") {
        if (personaWithCedula.getDataValue("id_persona").toString() === idFromParams) {
          return next()
        } else {
          return res.status(400).json({
            message: `La cédula "${cedulaFromBody}" ya está registrada por otra persona.`,
          })
        }
      } else {
        return res.status(400).json({
          message: `La cédula "${cedulaFromBody}" ya está registrada.`,
        })
      }
    } catch (error) {
      console.error("Error interno del servidor al validar cédula:", error)
      return res.status(500).json({
        message: "Error interno del servidor al validar cédula",
      })
    }
  }
}

export const personaValidator = new PersonaValidator()
