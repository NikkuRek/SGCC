import type { Request, Response } from "express"
import { CensoServices } from "../services"

export class CensoController {
  constructor() {}

  all = async (req: Request, res: Response) => {
    const { status, message, data } = await CensoServices.getAll()
    return res.status(status).json({
      message,
      data,
    })
  }

  one = async (req: Request, res: Response) => {
    const { id } = req.params
    const { status, message, data } = await CensoServices.getOne(id)
    return res.status(status).json({
      message,
      data,
    })
  }

  byYear = async (req: Request, res: Response) => {
    const { year } = req.params
    const { status, message, data } = await CensoServices.getByYear(Number.parseInt(year))
    return res.status(status).json({
      message,
      data,
    })
  }

  create = async (req: Request, res: Response) => {
    const { status, message, data } = await CensoServices.create(req.body)
    return res.status(status).json({
      message,
      data,
    })
  }

  update = async (req: Request, res: Response) => {
    const { id } = req.params
    const { status, message, data } = await CensoServices.update(id, req.body)
    return res.status(status).json({
      message,
      data,
    })
  }

  delete = async (req: Request, res: Response) => {
    const { id } = req.params
    const { status, message } = await CensoServices.delete(id)
    return res.status(status).json({
      message,
    })
  }
}
