"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cities extends Model {
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
  Cities.init(
    {
      id: { type: DataTypes.STRING, primaryKey: true },
      state_id: { type: DataTypes.STRING },
      name: { type: DataTypes.STRING },
      zipcode: { type: DataTypes.STRING },
      long: { type: DataTypes.STRING },
      lat: { type: DataTypes.STRING },

    },
    {
      sequelize,
    }
  );
  return Cities;
};
