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
          previewImage: "https://res.cloudinary.com/duzznvxix/image/upload/v1660855419/cld-sample.jpg",
          bio: "Just a profile for demonstration purposes",
          city: "Downingtown",
          country: "United States",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          email: "user1@user.io",
          username: "DemonChild",
          firstName: "Nico",
          lastName: "Robin",
          previewImage: "https://res.cloudinary.com/duzznvxix/image/upload/v1660862963/robin_vzkkue.jpg",
          bio: "An archaeologist looking for the best sounds from antiquity",
          country: "Ohara",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          email: "user2@user.io",
          username: "racoonXdog",
          firstName: "Tony",
          lastName: "Chopper",
          previewImage: "https://res.cloudinary.com/duzznvxix/image/upload/v1660862960/chopper_evizrv.jpg",
          bio: "I believe in the healing power of good music",
          city: "Drum Island",
          country: "Paradise",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          email: "user3@user.io",
          username: "Pirate_Empress",
          firstName: "Boa",
          lastName: "Hancock",
          previewImage: "https://res.cloudinary.com/duzznvxix/image/upload/v1660862958/boa_ffpnxa.jpg",
          bio: "Irresistible warlord of sound",
          city: "Kuja Village",
          country: "Amazon Lily",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          email: "user4@user.io",
          username: "Tekking101",
          firstName: "Matt",
          lastName: "Crawford",
          previewImage: "https://res.cloudinary.com/duzznvxix/image/upload/v1660861461/tekking_kokkkf.jpg",
          bio: "Passionate about tunes I can tumble to",
          city: "Pittsburgh",
          country: "United States",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          email: "user5@user.io",
          username: "Wano-Shogun",
          firstName: "Kozuki",
          lastName: "Momonosuke",
          previewImage: "https://res.cloudinary.com/duzznvxix/image/upload/v1660862958/momo_oddusc.png",
          bio: "A boy trapped in a man's body",
          city: "Flower Capitol",
          country: "Wano",
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
