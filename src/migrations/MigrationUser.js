'use strict'

const { DataTypes } = require('sequelize')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        // Tạo bảng Users với các thay đổi
        await queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
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
        // Rollback: Xóa bảng Users nếu cần
        await queryInterface.dropTable('Users')
    },
}
