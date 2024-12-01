const { DataTypes } = require('sequelize');
module.exports = function (sequelize) {
    return sequelize.define(
        'Tours_Attraction',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            tour_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Tours', // Tên bảng Tour (bảng chính)
                    key: 'id', // Khóa ngoại liên kết tới id của bảng Tours
                },
            },
            name: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            image: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
        },
        {
            sequelize,
            tableName: 'Tours_Attractions',
            timestamps: false, // Nếu không sử dụng các trường createdAt, updatedAt
            indexes: [
                {
                    name: 'tour_id_index',
                    fields: ['tour_id'], // Tạo index cho tour_id để tối ưu truy vấn
                },
            ],
        }
    );
};
