export interface PersonaInterface {
  id_persona?: number
  cedula: string
  nombres: string
  apellidos: string
  fecha_nacimiento?: Date
  sexo?: "M" | "F" | "Otro"
  telefono?: string
  createdAt?: Date
  updatedAt?: Date
}
