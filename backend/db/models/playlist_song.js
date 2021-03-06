'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Playlist_Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Playlist_Song.belongsTo(models.Playlist, {
        foreignKey: "playlistId"
      });
      Playlist_Song.belongsTo(models.Song, {
        foreignKey: "songId"
      })
    }
  }
  Playlist_Song.init({
    playlistId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    songId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Playlist_Song',
  });
  return Playlist_Song;
};