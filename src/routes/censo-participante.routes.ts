import { Router } from "express"
import { validateFields } from "../middlewares"
import { CensoParticipanteController } from "../controllers"
import { CensoParticipanteValidator } from "../validators"

const router = Router()
const censoParticipanteController = new CensoParticipanteController()
const censoParticipanteValidator = new CensoParticipanteValidator()

router.get("/", censoParticipanteController.all) // GET /api/censo-participante
router.get("/:id", censoParticipanteController.one) // GET /api/censo-participante/:id
router.get("/censo/:censoId", censoParticipanteController.byCenso) // GET /api/censo-participante/censo/:censoId
router.get("/persona/:personaId", censoParticipanteController.byPersona) // GET /api/censo-participante/persona/:personaId
router.post(
  "/",
  censoParticipanteValidator.validateFields,
  censoParticipanteValidator.validatePersonaExists,
  censoParticipanteValidator.validateCensoExists,
  censoParticipanteValidator.validateUniqueParticipation,
  validateFields,
  censoParticipanteController.create,
) // POST /api/censo-participante

router.put(
  "/:id",
  censoParticipanteValidator.validateFields,
  censoParticipanteValidator.validatePersonaExists,
  censoParticipanteValidator.validateCensoExists,
  censoParticipanteValidator.validateUniqueParticipation,
  validateFields,
  censoParticipanteController.update,
) // PUT /api/censo-participante/:id

router.delete("/:id", censoParticipanteController.delete) // DELETE /api/censo-participante/:id

export const CensoParticipanteRoute = router
export default router
