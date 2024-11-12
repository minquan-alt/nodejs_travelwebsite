'use strict'

const { DataTypes } = require('sequelize')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Tours', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
<<<<<<<< HEAD:src/migrations/MigrationTour.js
            tour_name: {
                type: Sequelize.STRING,
            },
            description: {
                type: Sequelize.STRING,
            },
            destination_id: {
                type: Sequelize.INTEGER,
            },
            image: {
                type: Sequelize.STRING,
            },
            start_date: {
                type: Sequelize.DATE,
            },
            end_date: {
                type: Sequelize.DATE,
            },
            price: {
                type: Sequelize.STRING,
            },
            capacity: {
                type: Sequelize.INTEGER,
========
            full_name: {
                type: Sequelize.STRING,
            },
            gender: {
                type: Sequelize.BOOLEAN,
            },
            dob: {
                type: Sequelize.DATE,
            },
            phone: {
                type: Sequelize.STRING,
            },
            email: {
                type: Sequelize.STRING,
            },
            password: {
                type: Sequelize.STRING,
>>>>>>>> 64b11bf9ec32251c0b22f3b73350c51e23d182e8:src/migrations/MigrationUser.js
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        })
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Tours')
    },
}
