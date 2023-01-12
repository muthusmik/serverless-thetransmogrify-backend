"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Uszips extends Model {
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
  Uszips.init(
    {
      zip: { type: DataTypes.STRING},
      city: { type: DataTypes.STRING },
      state_id: { type: DataTypes.STRING },
      state_name: { type: DataTypes.STRING},
      lat: { type: DataTypes.STRING },
      lng: { type: DataTypes.STRING },
      
    },
    {
      sequelize,
    }
  );
  return Uszips;
};
