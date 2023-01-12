"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class States extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Role.hasOne(models.brand_user_role, {
      //   foreignKey: "role_id",
      // });
      // Role.hasOne(models.UserRole, {
      //   foreignKey: "role_id",
      // });
    }
  }
  States.init(
    {
      id: { type: DataTypes.STRING, primaryKey: true },
      country_id: { type: DataTypes.STRING },
      name: { type: DataTypes.STRING },
      code: { type: DataTypes.STRING },
      
    },
    {
      sequelize,
    }
  );
  return States;
};
