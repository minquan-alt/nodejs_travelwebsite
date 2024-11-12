'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Users', [
            {
                email: 'hbminhquang.19@gmail.com',
                password: '123456',
                name: 'example@example.com',
                gender: 1,
                address: 'HCM',
                role: 'admin',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ])
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Users', null, {})
    },
}
