const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height_min: {
      type: DataTypes.STRING,
      allowNull: false
    },
    height_max: {
      type: DataTypes.STRING,
      allowNull: false
    },
    height: {
      type: DataTypes.VIRTUAL,
      get(){
        return `${this.height_min} - ${this.height_max}`
      }
    },
    weight_min: {
      type: DataTypes.STRING,
      allowNull: false
    },
    weight_max: {
      type: DataTypes.STRING,
      allowNull: false
    },
    weight: {
      type: DataTypes.VIRTUAL,
      get(){
        return `${this.weight_min} - ${this.weight_max}`
      }
    },
    year_min: {
      type: DataTypes.STRING,
      allowNull: false
    },
    year_max: {
      type: DataTypes.STRING,
      allowNull: false
    },
    yearsLife: {
      type: DataTypes.VIRTUAL,
      get(){
        return `${this.year_min} - ${this.year_max} years`
      }
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    created: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    timestamps: false
  });
};
