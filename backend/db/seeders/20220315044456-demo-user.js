'use strict'
const bcrypt = require('bcryptjs')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          email: 'demo@user.io',
          username: 'Demo-lition',
          firstName: "First",
          lastName: "Demo-user",
          hashedPassword: bcrypt.hashSync('password'),
        },
        {
          email: 'user1@user.io',
          username: 'FakeUser1',
          firstName: "Segundo",
          lastName: "Fakeuser",
          hashedPassword: bcrypt.hashSync('password2'),
        },
        {
          email: 'user2@user.io',
          username: 'FakeUser2',
          firstName: "Tercer",
          lastName: "Fakeuser",
          hashedPassword: bcrypt.hashSync('password3'),
        },
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op
    return queryInterface.bulkDelete(
      'Users',
      {
        username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] },
      },
      {}
    )
  },
}