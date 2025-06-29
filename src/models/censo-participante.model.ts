import { DataTypes } from "sequelize"

export const CensoParticipanteModel = {
  id_censo_part: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_persona: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_censo: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tipo_via: {
    type: DataTypes.ENUM("Avenida", "Calle"),
    allowNull: true,
  },
  nombre_via: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  manzana: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  nro_casa: {
    type: DataTypes.STRING(10),
    allowNull: true,
  },
  jefe_familia: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  cant_anexo_familia: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  parentesco: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  fecha_registro: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}
