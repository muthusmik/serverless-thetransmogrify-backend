"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SchoolDetails extends Model {
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
  SchoolDetails.init(
    {
      
       
       school_name:{ type: DataTypes.STRING },
      
      createdAt: {
        field: 'created_at',
        type: DataTypes.DATE
    },
    updatedAt: {
        field: 'updated_at',
        type: DataTypes.DATE
    }
    
    },
    {
      sequelize,
      
       
       
    }
  );
  return SchoolDetails;
};
