import { check } from "express-validator"
import type { NextFunction, Request, Response } from "express"
import { PersonaDB, CensoDB, CensoParticipanteDB } from "../config/sequelize.config"

export class CensoParticipanteValidator {
  validateFields = [
    check("id_persona", "El ID de la persona es obligatorio").not().isEmpty(),
    check("id_persona", "El ID de la persona debe ser un número").isNumeric(),

    check("id_censo", "El ID del censo es obligatorio").not().isEmpty(),
    check("id_censo", "El ID del censo debe ser un número").isNumeric(),

    check("tipo_via", "El tipo de vía debe ser 'Avenida' o 'Calle'").optional().isIn(["Avenida", "Calle"]),

    check("nombre_via", "El nombre de la vía es obligatorio").not().isEmpty(),
    check("nombre_via", "El nombre de la vía debe tener máximo 100 caracteres").isLength({ max: 100 }),

    check("manzana", "La manzana debe tener máximo 20 caracteres").optional().isLength({ max: 20 }),

    check("nro_casa", "El número de casa debe tener máximo 10 caracteres").optional().isLength({ max: 10 }),

    check("jefe_familia", "El campo jefe de familia debe ser un valor booleano").isBoolean(),

    check("cant_anexo_familia", "La cantidad de anexo familia debe ser un número entero").optional().isInt({ min: 0 }),

    check("parentesco", "El parentesco debe tener máximo 50 caracteres").optional().isLength({ max: 50 }),

    check("fecha_registro", "La fecha de registro es obligatoria").not().isEmpty(),
    check("fecha_registro", "La fecha de registro debe ser una fecha válida").isISO8601().toDate(),
  ]

  validatePersonaExists = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id_persona } = req.body

      if (!id_persona) {
        return next()
      }

      const persona = await PersonaDB.findByPk(id_persona)
      if (!persona) {
        return res.status(400).json({
          message: "La persona especificada no existe",
        })
      }

      next()
    } catch (error) {
      console.error("Error al validar persona:", error)
      return res.status(500).json({
        message: "Error interno del servidor al validar persona",
      })
    }
  }

  validateCensoExists = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id_censo } = req.body

      if (!id_censo) {
        return next()
      }

      const censo = await CensoDB.findByPk(id_censo)
      if (!censo) {
        return res.status(400).json({
          message: "El censo especificado no existe",
        })
      }

      next()
    } catch (error) {
      console.error("Error al validar censo:", error)
      return res.status(500).json({
        message: "Error interno del servidor al validar censo",
      })
    }
  }

  validateUniqueParticipation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id_persona, id_censo } = req.body
      const participanteId = req.params.id

      if (!id_persona || !id_censo) {
        return next()
      }

      const existingParticipation = await CensoParticipanteDB.findOne({
        where: { id_persona, id_censo },
      })

      if (existingParticipation) {
        // Si es una actualización y es el mismo registro, permitir
        if (
          req.method.toLowerCase() === "put" &&
          existingParticipation.getDataValue("id_censo_part").toString() === participanteId
        ) {
          return next()
        } else {
          return res.status(400).json({
            message: "Esta persona ya está registrada en este censo",
          })
        }
      }

      next()
    } catch (error) {
      console.error("Error al validar participación única:", error)
      return res.status(500).json({
        message: "Error interno del servidor al validar participación",
      })
    }
  }
}

export const censoParticipanteValidator = new CensoParticipanteValidator()
