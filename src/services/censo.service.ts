import { CensoDB, PersonaDB, CensoParticipanteDB } from "../config/sequelize.config"
import { ValidationError } from "sequelize"
import type { CensoInterface } from "../interfaces"

class CensoService {
  async getAll() {
    try {
      const censos = await CensoDB.findAll({
        order: [["anio_censo", "DESC"]],
      })
      return {
        status: 200,
        message: "Censos obtenidos correctamente",
        data: censos,
      }
    } catch (error) {
      return {
        status: 500,
        message: "Error al obtener censos",
        data: null,
      }
    }
  }

  async getOne(id: string) {
    try {
      const censo = await CensoDB.findByPk(id, {
        include: [
          {
            model: CensoParticipanteDB,
            as: "Participantes",
            include: [
              {
                model: PersonaDB,
                as: "Persona",
              },
            ],
          },
        ],
      })

      if (!censo) {
        return {
          status: 404,
          message: "Censo no encontrado",
          data: null,
        }
      }
      return {
        status: 200,
        message: "Censo obtenido correctamente",
        data: censo,
      }
    } catch (error) {
      return {
        status: 500,
        message: "Error al obtener censo",
        data: null,
      }
    }
  }

  async getByYear(year: number) {
    try {
      const censos = await CensoDB.findAll({
        where: { anio_censo: year },
        order: [["fecha_inicio", "ASC"]],
      })

      return {
        status: 200,
        message: "Censos obtenidos correctamente",
        data: censos,
      }
    } catch (error) {
      return {
        status: 500,
        message: "Error al obtener censos",
        data: null,
      }
    }
  }

  async create(censoData: CensoInterface) {
    try {
      const newCenso = await CensoDB.create(censoData as any)

      return {
        status: 201,
        message: "Censo creado correctamente",
        data: newCenso,
      }
    } catch (error) {
      console.error("Error al crear censo:", error)
      if (error instanceof ValidationError) {
        return {
          status: 400,
          message: "Error de validación",
          data: error.errors.map((err) => err.message),
        }
      }
      return {
        status: 500,
        message: "Error al crear censo",
        data: null,
      }
    }
  }

  async update(id: string, censoData: Partial<CensoInterface>) {
    try {
      const existingCenso = await CensoDB.findByPk(id)
      if (!existingCenso) {
        return {
          status: 404,
          message: "Censo no encontrado",
          data: null,
        }
      }

      await existingCenso.update(censoData)

      return {
        status: 200,
        message: "Censo actualizado correctamente",
        data: existingCenso,
      }
    } catch (error) {
      console.error("Error al actualizar censo:", error)
      if (error instanceof ValidationError) {
        return {
          status: 400,
          message: "Error de validación",
          data: error.errors.map((err) => err.message),
        }
      }
      return {
        status: 500,
        message: "Error al actualizar censo",
        data: null,
      }
    }
  }

  async delete(id: string) {
    try {
      const censo = await CensoDB.findByPk(id)
      if (!censo) {
        return {
          status: 404,
          message: "Censo no encontrado",
        }
      }
      await censo.destroy()
      return {
        status: 200,
        message: "Censo eliminado correctamente",
      }
    } catch (error) {
      console.error("Error al eliminar censo:", error)
      return {
        status: 500,
        message: "Error al eliminar censo",
      }
    }
  }
}

export const CensoServices = new CensoService()
