import { Router } from "express"
import { validateFields } from "../middlewares"
import { PersonaController } from "../controllers"
import { PersonaValidator } from "../validators"

const router = Router()
const personaController = new PersonaController()
const personaValidator = new PersonaValidator()

router.get("/", personaController.all) // GET /api/persona
router.get("/:id", personaController.one) // GET /api/persona/:id
router.get("/cedula/:cedula", personaController.byCedula) // GET /api/persona/cedula/:cedula
router.post(
  "/",
  personaValidator.validateFields,
  personaValidator.validateCedulaExists,
  validateFields,
  personaController.create,
) // POST /api/persona

router.put(
  "/:id",
  personaValidator.validateFields,
  personaValidator.validateCedulaExists,
  validateFields,
  personaController.update,
) // PUT /api/persona/:id

router.delete("/:id", personaController.delete) // DELETE /api/persona/:id

export const PersonaRoute = router
export default router
