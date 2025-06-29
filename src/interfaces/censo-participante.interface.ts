export interface CensoParticipanteInterface {
  id_censo_part?: number
  id_persona: number
  id_censo: number
  tipo_via?: "Avenida" | "Calle"
  nombre_via: string
  manzana?: string
  nro_casa?: string
  jefe_familia: boolean
  cant_anexo_familia?: number
  parentesco?: string
  fecha_registro: Date
  createdAt?: Date
  updatedAt?: Date
}
