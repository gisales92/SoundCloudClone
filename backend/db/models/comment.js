"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.Song, {
        foreignKey: "songId",
      });
      Comment.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }
  Comment.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      songId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      body: {
        type: DataTypes.STRING(180),
        allowNull:false,
        validate: {
          notNull: {
            args: true,
            msg: "Please provide a value for your comment",
          },
          notEmpty: {
            args: true,
            msg: "Please provide a value for your comment",
          },
          len: {
            args: [1, 180],
            msg: "Comment must not be more than 180 characters long",
          },
        }
      },
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
