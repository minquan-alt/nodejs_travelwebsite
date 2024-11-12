'use strict'

const { DataTypes } = require('sequelize')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
<<<<<<< HEAD
        // Tạo bảng Users với các thay đổi
        await queryInterface.createTable('Users', {
=======
        await queryInterface.createTable('Tours', {
>>>>>>> 64b11bf9ec32251c0b22f3b73350c51e23d182e8
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
<<<<<<< HEAD
            full_name: {
                type: Sequelize.STRING,
                allowNull: false, // Thêm constraint nếu cần
            },
            gender: {
                type: Sequelize.STRING, // Thay đổi kiểu dữ liệu thành STRING
                allowNull: true, // Nếu cần thiết, có thể thay đổi
            },
            dob: {
                type: Sequelize.DATE,
                allowNull: true, // Cập nhật theo yêu cầu
            },
            phone: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true, // Đảm bảo rằng số điện thoại là duy nhất
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true, // Đảm bảo rằng email là duy nhất
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
=======
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
>>>>>>> 64b11bf9ec32251c0b22f3b73350c51e23d182e8
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
<<<<<<< HEAD

    async down(queryInterface, Sequelize) {
        // Rollback: Xóa bảng Users nếu cần
        await queryInterface.dropTable('Users')
=======
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Tours')
>>>>>>> 64b11bf9ec32251c0b22f3b73350c51e23d182e8
    },
}
