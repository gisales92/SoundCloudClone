"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Playlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Playlist.belongsTo(models.User, {
        foreignKey: "userId",
      });
      Playlist.belongsToMany(models.Song, {
        through: models.Playlist_Song,
        foreignKey: 'playlistId',
        otherKey: 'songId',
      });
    }
  }
  Playlist.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Please provide a value for Playlist name",
          },
          notEmpty: {
            args: true,
            msg: "Please provide a value for Playlist name",
          },
          len: {
            args: [1, 100],
            msg: "Playlist name must not be more than 100 characters long",
          },
        },
      },
      previewImage: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Playlist",
    }
  );
  return Playlist;
};
