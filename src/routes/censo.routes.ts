import { Router } from "express"
import { validateFields } from "../middlewares"
import { CensoController } from "../controllers"
import { CensoValidator } from "../validators"

const router = Router()
const censoController = new CensoController()
const censoValidator = new CensoValidator()

router.get("/", censoController.all) // GET /api/censo
router.get("/:id", censoController.one) // GET /api/censo/:id
router.get("/year/:year", censoController.byYear) // GET /api/censo/year/:year
router.post(
  "/",
  censoValidator.validateFields,
  censoValidator.validateDateRange,
  validateFields,
  censoController.create,
) // POST /api/censo

router.put(
  "/:id",
  censoValidator.validateFields,
  censoValidator.validateDateRange,
  validateFields,
  censoController.update,
) // PUT /api/censo/:id

router.delete("/:id", censoController.delete) // DELETE /api/censo/:id

export const CensoRoute = router
export default router
