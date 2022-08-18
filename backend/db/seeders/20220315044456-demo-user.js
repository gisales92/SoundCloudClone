"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "demo@user.io",
          username: "Demo-lition",
          firstName: "Demo",
          lastName: "McUser",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          email: "user1@user.io",
          username: "Demon_Child",
          firstName: "Nico",
          lastName: "Robin",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          email: "user2@user.io",
          username: "Racoon_dog",
          firstName: "Tony",
          lastName: "Chopper",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          email: "user3@user.io",
          username: "Pirate_Empress",
          firstName: "Boa",
          lastName: "Hancock",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          email: "user4@user.io",
          username: "Tekking101",
          firstName: "Matt",
          lastName: "Crawford",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          email: "user5@user.io",
          username: "Wano-kuni",
          firstName: "Kozuki",
          lastName: "Momonosuke",
          hashedPassword: bcrypt.hashSync("password"),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      "Users",
      {
        username: { [Op.in]: ["Demo-lition", "FakeUser1", "FakeUser2"] },
      },
      {}
    );
  },
};
