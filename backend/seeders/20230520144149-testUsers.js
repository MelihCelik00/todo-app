'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Users', [{
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: "123456"
    }, {
      name: 'Jane Doe',
      email: 'janedoe@mail.com',
      password: "789012"
    }]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};