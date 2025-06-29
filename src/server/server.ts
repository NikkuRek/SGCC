import express, { type Application } from "express"
import cors from "cors"
import morgan from "morgan"
import swaggerJsDoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"
import { swaggerOptions } from "../config"

import { HealthRoute, PersonaRoute, CensoRoute, CensoParticipanteRoute } from "../routes/index.route"


export class Server {
  private app: Application
  private port: string
  private apiurl: string
  private pre = "/api"
  private paths: any

  constructor() {
    this.app = express()
    this.port = process.env.PORT || "3000"
    this.apiurl = process.env.API_URL || `http://localhost:${this.port}`
    this.paths = {
      careers: this.pre + "/career",
      players: this.pre + "/player",
      tiers: this.pre + "/tier",
      health: this.pre + "/health",
      tournaments: this.pre + "/tournament",
      teams: this.pre + "/team",
      inscriptions: this.pre + "/inscription",
      matches: this.pre + "/match",
      sets: this.pre + "/set",
    }
    this.middlewares()
    this.routes()
    this.swaggerSetup()
  }

  middlewares() {
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(express.static("src/public"))
    this.app.use(morgan("dev"))
  }

  routes() {
    this.app.use(this.paths.health, HealthRoute)
    this.app.use(this.pre + "/persona", PersonaRoute)
    this.app.use(this.pre + "/censo", CensoRoute)
    this.app.use(this.pre + "/censo-participante", CensoParticipanteRoute)
  }

  listen() {
    this.app.listen(this.port, () => {
      const URL = `${this.apiurl}/swagger/#`
      console.log(`Servidor corriendo en ${URL}`)
    })
  }

  swaggerSetup() {
    const swaggerDocs = swaggerJsDoc(swaggerOptions)
    this.app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
  }
}
