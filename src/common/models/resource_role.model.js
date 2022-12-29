"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ResourceRole extends Model {
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
  ResourceRole.init(
    {

      resource_id: {type:DataTypes.STRING},
      role_id:{type:DataTypes.STRING},
      can_add:{type:DataTypes.BOOLEAN},
      
      can_view:{type:DataTypes.BOOLEAN},
      
      can_edit:{type:DataTypes.BOOLEAN},
      
      
    },
    {
      sequelize,
      timestamps: false,
    }
  );
  return ResourceRole;
};
