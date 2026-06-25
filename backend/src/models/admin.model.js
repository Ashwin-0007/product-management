const { DataTypes } = require('sequelize');

const defineAdminModel = sequelize => {
  const Admin = sequelize.define(
    'Admin',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(120),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(180),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      passwordHash: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'password_hash',
      },
      refreshTokenVersion: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: 'refresh_token_version',
      },
    },
    {
      tableName: 'admins',
      underscored: true,
    }
  );

  Admin.prototype.toSafeJSON = function toSafeJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  };

  return Admin;
};

module.exports = defineAdminModel;
