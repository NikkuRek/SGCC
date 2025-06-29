import { HealthRoute } from "./health.routes"
import { Router } from "express"
import { PersonaRoute } from "./persona.routes"
import { CensoRoute } from "./censo.routes"
import { CensoParticipanteRoute } from "./censo-participante.routes"

const router = Router()

export { PersonaRoute, CensoRoute, CensoParticipanteRoute, HealthRoute, router }
