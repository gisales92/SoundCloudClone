'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Song.belongsTo(models.User, {
        foreignKey: "userId",
      });
      Song.belongsTo(models.Album, {
        foreignKey: 'albumId',
      });
      Song.belongsToMany(models.Playlist, {
        through: models.Playlist_Song,
        foreignKey: 'songId',
        otherKey: 'playlistId',
      });
      Song.hasMany(models.Comment, {
        foreignKey: "songId"
      })
    }
  }
  Song.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    albumId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Please provide a value for Song title",
        },
        notEmpty: {
          args: true,
          msg: "Please provide a value for Song title",
        },
        len: {
          args: [1, 100],
          msg: "Song title must not be more than 100 characters long",
        },
      },
    },
    description: {
      type: DataTypes.STRING(256),
      validate: {
        len: {
          args: [0, 256],
          msg: "Song description must not be more than 256 characters long",
        },
      }
    },
    soundFileURL: {
      type: DataTypes.STRING,
      allowNull: false
    },
    previewImage: DataTypes.STRING,
    playCount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Song',
  });
  return Song;
};