"use strict";
const bcrypt = require("bcryptjs");
const { Validator, Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Username cannot be an email.");
            }
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            args: true,
            msg: "Email is required",
          },
          notEmpty: {
            args: true,
            msg: "Email is required",
          },
          len: {
            args: [3, 256],
            msg: "Email must be less than 256 characters",
          },
          isEmail: {
            args: true,
            msg: "Invalid email",
          },
        },
      },
      firstName: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "First Name is required",
          },
          notEmpty: {
            args: true,
            msg: "First Name is required",
          },
          len: {
            args: [1, 20],
            msg: "First name must be less than 20 characters",
          },
        },
      },
      lastName: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Last Name is required",
          },
          notEmpty: {
            args: true,
            msg: "Last Name is required",
          },
          len: {
            args: [1, 20],
            msg: "Last name must be less than 20 characters",
          },
        },
      },
      previewImage: DataTypes.STRING,
      bio: DataTypes.STRING,
      city: DataTypes.STRING,
      country: DataTypes.STRING,
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Password is required",
          },
          notEmpty: {
            args: true,
            msg: "Password is required",
          },
          len: [60, 60],
        },
      },
    },
    {
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "email", "createdAt", "updatedAt"],
        },
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ["hashedPassword"] },
        },
        loginUser: {
          attributes: {},
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  User.prototype.toSafeObject = function () {
    // remember, this cannot be an arrow function
    const { id, firstName, lastName, email } = this; // context will be the User instance
    return { id, firstName, lastName, email };
  };

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  User.getCurrentUserById = async function (id) {
    return await User.scope("currentUser").findByPk(id);
  };

  User.login = async function ({ credential, password }) {
    const { Op } = require("sequelize");
    const user = await User.scope("loginUser").findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential,
        },
      },
    });
    if (user && user.validatePassword(password)) {
      return await User.scope("currentUser").findByPk(user.id);
    }
  };

  User.signup = async function ({ username, email, password }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      username,
      email,
      hashedPassword,
    });
    return await User.scope("currentUser").findByPk(user.id);
  };

  return User;
};
