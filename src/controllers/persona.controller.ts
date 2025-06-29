import type { Request, Response } from "express"
import { PersonaServices } from "../services"

export class PersonaController {
  constructor() {}

  all = async (req: Request, res: Response) => {
    const { status, message, data } = await PersonaServices.getAll()
    return res.status(status).json({
      message,
      data,
    })
  }

  one = async (req: Request, res: Response) => {
    const { id } = req.params
    const { status, message, data } = await PersonaServices.getOne(id)
    return res.status(status).json({
      message,
      data,
    })
  }

  byCedula = async (req: Request, res: Response) => {
    const { cedula } = req.params
    const { status, message, data } = await PersonaServices.getByCedula(cedula)
    return res.status(status).json({
      message,
      data,
    })
  }

  create = async (req: Request, res: Response) => {
    const { status, message, data } = await PersonaServices.create(req.body)
    return res.status(status).json({
      message,
      data,
    })
  }

  update = async (req: Request, res: Response) => {
    const { id } = req.params
    const { status, message, data } = await PersonaServices.update(id, req.body)
    return res.status(status).json({
      message,
      data,
    })
  }

  delete = async (req: Request, res: Response) => {
    const { id } = req.params
    const { status, message } = await PersonaServices.delete(id)
    return res.status(status).json({
      message,
    })
  }
}
