import { Router } from "express"

const router = Router()

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Sistema de Gestión de Censos Comunitarios - API funcionando correctamente",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  })
})

export const HealthRoute = router
export default router
