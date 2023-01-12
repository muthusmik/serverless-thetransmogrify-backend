"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AcademicDetails extends Model {
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
  AcademicDetails.init(
    {
      
      schoolId: { type: DataTypes.STRING },
      graduationYear: { type: DataTypes.STRING },
      userId: { type: DataTypes.STRING },
      isAdult: { type: DataTypes.BOOLEAN },
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
      
       
       
    }
  );
  return AcademicDetails;
};
