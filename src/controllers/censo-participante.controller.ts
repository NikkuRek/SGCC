import type { Request, Response } from "express"
import { CensoParticipanteServices } from "../services"

export class CensoParticipanteController {
  constructor() {}

  all = async (req: Request, res: Response) => {
    const { status, message, data } = await CensoParticipanteServices.getAll()
    return res.status(status).json({
      message,
      data,
    })
  }

  one = async (req: Request, res: Response) => {
    const { id } = req.params
    const { status, message, data } = await CensoParticipanteServices.getOne(id)
    return res.status(status).json({
      message,
      data,
    })
  }

  byCenso = async (req: Request, res: Response) => {
    const { censoId } = req.params
    const { status, message, data } = await CensoParticipanteServices.getByCenso(censoId)
    return res.status(status).json({
      message,
      data,
    })
  }

  byPersona = async (req: Request, res: Response) => {
    const { personaId } = req.params
    const { status, message, data } = await CensoParticipanteServices.getByPersona(personaId)
    return res.status(status).json({
      message,
      data,
    })
  }

  create = async (req: Request, res: Response) => {
    const { status, message, data } = await CensoParticipanteServices.create(req.body)
    return res.status(status).json({
      message,
      data,
    })
  }

  update = async (req: Request, res: Response) => {
    const { id } = req.params
    const { status, message, data } = await CensoParticipanteServices.update(id, req.body)
    return res.status(status).json({
      message,
      data,
    })
  }

  delete = async (req: Request, res: Response) => {
    const { id } = req.params
    const { status, message } = await CensoParticipanteServices.delete(id)
    return res.status(status).json({
      message,
    })
  }
}
