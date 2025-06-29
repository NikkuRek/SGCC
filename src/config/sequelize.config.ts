import { Sequelize, type Dialect } from "sequelize"
import dotenv from "dotenv"

import { PersonaModel, CensoModel, CensoParticipanteModel } from "../models"

dotenv.config()

const dbName: string = process.env.DATABASE_NAME!
const dbUser: string = process.env.DATABASE_USER!
const dbPassword: string = process.env.DATABASE_PASSWORD!
const dbDialect: Dialect = process.env.DATABASE_DIALECT! as Dialect
const dbHost: string = process.env.DATABASE_HOST!
const dbPort: number = Number(process.env.DATABASE_PORT)

const sequelizeOptions: any = {
  dialect: dbDialect,
  host: dbHost,
  logging: false,
  dialectOptions: {
    timezone: "-04:00",
    connectTimeout: 60000,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
}

if (dbHost !== "localhost") {
  sequelizeOptions.port = dbPort
}

export const db = new Sequelize(dbName, dbUser, dbPassword, sequelizeOptions)

// Modelos
export const PersonaDB = db.define("personas", PersonaModel, {
  timestamps: true,
  tableName: "personas",
})

export const CensoDB = db.define("censos", CensoModel, {
  timestamps: true,
  tableName: "censos",
})

export const CensoParticipanteDB = db.define("censo_participantes", CensoParticipanteModel, {
  timestamps: true,
  tableName: "censo_participantes",
})

// Relaciones

// Persona -> CensoParticipante
PersonaDB.hasMany(CensoParticipanteDB, {
  foreignKey: "id_persona",
  as: "ParticipacionesCenso",
})
CensoParticipanteDB.belongsTo(PersonaDB, {
  foreignKey: "id_persona",
  as: "Persona",
})

// Censo -> CensoParticipante
CensoDB.hasMany(CensoParticipanteDB, {
  foreignKey: "id_censo",
  as: "Participantes",
})
CensoParticipanteDB.belongsTo(CensoDB, {
  foreignKey: "id_censo",
  as: "Censo",
})

// Relación many-to-many entre Persona y Censo a través de CensoParticipante
PersonaDB.belongsToMany(CensoDB, {
  through: CensoParticipanteDB,
  foreignKey: "id_persona",
  otherKey: "id_censo",
  as: "Censos",
})

CensoDB.belongsToMany(PersonaDB, {
  through: CensoParticipanteDB,
  foreignKey: "id_censo",
  otherKey: "id_persona",
  as: "Personas",
})

export const syncModels = async () => {
  try {
    await db.authenticate()
    await db.sync({ alter: true })
    console.log("Conectando a la base de datos...")
    await db.sync({ alter: true })
    console.log("Base de datos sincronizada")
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error)
    throw error
  }
}
syncModels()

export default db
