const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dieta', {
    dietName :{
      //no paso el id porque lo genera automaticamente la BD
      // genera un id numerico
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
};