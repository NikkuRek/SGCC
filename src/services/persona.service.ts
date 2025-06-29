import { PersonaDB } from "../config/sequelize.config"
import { ValidationError } from "sequelize"
import type { PersonaInterface } from "../interfaces"

class PersonaService {
  async getAll() {
    try {
      const personas = await PersonaDB.findAll({
        order: [
          ["apellidos", "ASC"],
          ["nombres", "ASC"],
        ],
      })
      return {
        status: 200,
        message: "Personas obtenidas correctamente",
        data: personas,
      }
    } catch (error) {
      return {
        status: 500,
        message: "Error al obtener personas",
        data: null,
      }
    }
  }

  async getOne(id: string) {
    try {
      const persona = await PersonaDB.findByPk(id)

      if (!persona) {
        return {
          status: 404,
          message: "Persona no encontrada",
          data: null,
        }
      }
      return {
        status: 200,
        message: "Persona obtenida correctamente",
        data: persona,
      }
    } catch (error) {
      return {
        status: 500,
        message: "Error al obtener persona",
        data: null,
      }
    }
  }

  async getByCedula(cedula: string) {
    try {
      const persona = await PersonaDB.findOne({
        where: { cedula },
      })

      if (!persona) {
        return {
          status: 404,
          message: "Persona no encontrada",
          data: null,
        }
      }
      return {
        status: 200,
        message: "Persona obtenida correctamente",
        data: persona,
      }
    } catch (error) {
      return {
        status: 500,
        message: "Error al obtener persona",
        data: null,
      }
    }
  }

  async create(personaData: PersonaInterface) {
    try {
      const newPersona = await PersonaDB.create(personaData as any)

      return {
        status: 201,
        message: "Persona creada correctamente",
        data: newPersona,
      }
    } catch (error) {
      console.error("Error al crear persona:", error)
      if (error instanceof ValidationError) {
        return {
          status: 400,
          message: "Error de validación",
          data: error.errors.map((err) => err.message),
        }
      }
      return {
        status: 500,
        message: "Error al crear persona",
        data: null,
      }
    }
  }

  async update(id: string, personaData: Partial<PersonaInterface>) {
    try {
      const existingPersona = await PersonaDB.findByPk(id)
      if (!existingPersona) {
        return {
          status: 404,
          message: "Persona no encontrada",
          data: null,
        }
      }

      await existingPersona.update(personaData)

      return {
        status: 200,
        message: "Persona actualizada correctamente",
        data: existingPersona,
      }
    } catch (error) {
      console.error("Error al actualizar persona:", error)
      if (error instanceof ValidationError) {
        return {
          status: 400,
          message: "Error de validación",
          data: error.errors.map((err) => err.message),
        }
      }
      return {
        status: 500,
        message: "Error al actualizar persona",
        data: null,
      }
    }
  }

  async delete(id: string) {
    try {
      const persona = await PersonaDB.findByPk(id)
      if (!persona) {
        return {
          status: 404,
          message: "Persona no encontrada",
        }
      }
      await persona.destroy()
      return {
        status: 200,
        message: "Persona eliminada correctamente",
      }
    } catch (error) {
      console.error("Error al eliminar persona:", error)
      return {
        status: 500,
        message: "Error al eliminar persona",
      }
    }
  }
}

export const PersonaServices = new PersonaService()
