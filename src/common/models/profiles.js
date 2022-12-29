"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Profiles extends Model {
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
  Profiles.init(
    {
      user_id: {type:DataTypes.INTEGER},
      firstName: {type:DataTypes.STRING},
      lastName:{type:DataTypes.STRING},
      dob:{type:DataTypes.STRING},
      gender:{type:DataTypes.STRING},
      createdAt: {
        field: 'createdAt',
        type: DataTypes.DATE
    },
    updatedAt: {
        field: 'updatedAt',
        type: DataTypes.DATE
    }
      
    },
    {
      sequelize,
      timestamps: false,
    }
  );
  return Profiles;
};
