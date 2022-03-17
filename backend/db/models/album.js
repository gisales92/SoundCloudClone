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
      Album.belongsToMany(models.Song, {
        through: models.Album_Song,
        foreignKey: 'albumId',
        otherKey: 'songId',
      });
    }
  }
  Album.init({
    userId: DataTypes.INTEGER,
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Please provide a value for Album title",
        },
        notEmpty: {
          args: true,
          msg: "Please provide a value for Album title",
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