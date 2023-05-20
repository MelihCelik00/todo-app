'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('Todos', [{
        title: 'Completing study case',
        status: false,
        UserId: 1
      }, {
        title: 'Look React Documentation',
        status: true,
        UserId: 1
      },
      {
        title: 'Playable Factory Case',
        status: false,
        UserId: 2
      }
    ]);
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