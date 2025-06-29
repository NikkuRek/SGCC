import { CensoParticipanteDB, PersonaDB, CensoDB } from "../config/sequelize.config"
import { ValidationError } from "sequelize"
import type { CensoParticipanteInterface } from "../interfaces"

class CensoParticipanteService {
  async getAll() {
    try {
      const participantes = await CensoParticipanteDB.findAll({
        include: [
          {
            model: PersonaDB,
            as: "Persona",
          },
          {
            model: CensoDB,
            as: "Censo",
          },
        ],
        order: [["fecha_registro", "DESC"]],
      })
      return {
        status: 200,
        message: "Participantes obtenidos correctamente",
        data: participantes,
      }
    } catch (error) {
      return {
        status: 500,
        message: "Error al obtener participantes",
        data: null,
      }
    }
  }

  async getOne(id: string) {
    try {
      const participante = await CensoParticipanteDB.findByPk(id, {
        include: [
          {
            model: PersonaDB,
            as: "Persona",
          },
          {
            model: CensoDB,
            as: "Censo",
          },
        ],
      })

      if (!participante) {
        return {
          status: 404,
          message: "Participante no encontrado",
          data: null,
        }
      }
      return {
        status: 200,
        message: "Participante obtenido correctamente",
        data: participante,
      }
    } catch (error) {
      return {
        status: 500,
        message: "Error al obtener participante",
        data: null,
      }
    }
  }

  async getByCenso(censoId: string) {
    try {
      const participantes = await CensoParticipanteDB.findAll({
        where: { id_censo: censoId },
        include: [
          {
            model: PersonaDB,
            as: "Persona",
          },
        ],
        order: [
          ["jefe_familia", "DESC"],
          ["cant_anexo_familia", "ASC"],
        ],
      })

      return {
        status: 200,
        message: "Participantes del censo obtenidos correctamente",
        data: participantes,
      }
    } catch (error) {
      return {
        status: 500,
        message: "Error al obtener participantes del censo",
        data: null,
      }
    }
  }

  async getByPersona(personaId: string) {
    try {
      const participaciones = await CensoParticipanteDB.findAll({
        where: { id_persona: personaId },
        include: [
          {
            model: CensoDB,
            as: "Censo",
          },
        ],
        order: [["fecha_registro", "DESC"]],
      })

      return {
        status: 200,
        message: "Participaciones de la persona obtenidas correctamente",
        data: participaciones,
      }
    } catch (error) {
      return {
        status: 500,
        message: "Error al obtener participaciones de la persona",
        data: null,
      }
    }
  }

  async create(participanteData: CensoParticipanteInterface) {
    try {
      const newParticipante = await CensoParticipanteDB.create(participanteData as any)

      const participanteCompleto = await CensoParticipanteDB.findByPk(newParticipante.getDataValue("id_censo_part"), {
        include: [
          {
            model: PersonaDB,
            as: "Persona",
          },
          {
            model: CensoDB,
            as: "Censo",
          },
        ],
      })

      return {
        status: 201,
        message: "Participante creado correctamente",
        data: participanteCompleto,
      }
    } catch (error) {
      console.error("Error al crear participante:", error)
      if (error instanceof ValidationError) {
        return {
          status: 400,
          message: "Error de validación",
          data: error.errors.map((err) => err.message),
        }
      }
      return {
        status: 500,
        message: "Error al crear participante",
        data: null,
      }
    }
  }

  async update(id: string, participanteData: Partial<CensoParticipanteInterface>) {
    try {
      const existingParticipante = await CensoParticipanteDB.findByPk(id)
      if (!existingParticipante) {
        return {
          status: 404,
          message: "Participante no encontrado",
          data: null,
        }
      }

      await existingParticipante.update(participanteData)

      const participanteActualizado = await CensoParticipanteDB.findByPk(id, {
        include: [
          {
            model: PersonaDB,
            as: "Persona",
          },
          {
            model: CensoDB,
            as: "Censo",
          },
        ],
      })

      return {
        status: 200,
        message: "Participante actualizado correctamente",
        data: participanteActualizado,
      }
    } catch (error) {
      console.error("Error al actualizar participante:", error)
      if (error instanceof ValidationError) {
        return {
          status: 400,
          message: "Error de validación",
          data: error.errors.map((err) => err.message),
        }
      }
      return {
        status: 500,
        message: "Error al actualizar participante",
        data: null,
      }
    }
  }

  async delete(id: string) {
    try {
      const participante = await CensoParticipanteDB.findByPk(id)
      if (!participante) {
        return {
          status: 404,
          message: "Participante no encontrado",
        }
      }
      await participante.destroy()
      return {
        status: 200,
        message: "Participante eliminado correctamente",
      }
    } catch (error) {
      console.error("Error al eliminar participante:", error)
      return {
        status: 500,
        message: "Error al eliminar participante",
      }
    }
  }
}

export const CensoParticipanteServices = new CensoParticipanteService()
