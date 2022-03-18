'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Album extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Album.belongsTo(models.User, {
        foreignKey: "userId",
      });
      Album.hasMany(models.Song, {
        foreignKey: 'albumId'
      });
    }
  }
  Album.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Album title is required",
        },
        notEmpty: {
          args: true,
          msg: "Album title is required",
        },
        len: {
          args: [1, 100],
          msg: "Album title must not be more than 100 characters long",
        },
      },
    },
    description: {
      type: DataTypes.STRING(256),
      validate: {
        len: {
          args: [0, 256],
          msg: "Album description must not be more than 256 characters long",
        },
      }
    },
    previewImage: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Album',
  });
  return Album;
};