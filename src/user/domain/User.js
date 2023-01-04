const Sequelize = require('sequelize');

class User extends Sequelize.Model {
    static initiate(sequelize) {
        User.init({
            username: {
                type: Sequelize.STRING(45),
                allowNull: false
            },
            password: {
                type: Sequelize.STRING(80),
                allowNull: false
            },
            email: {
                type: Sequelize.STRING(45),
                allowNull: false
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: true,
            modelName: "User",
            tableName: "user",
            paranoid: true,
            charset: "utf8mb4",
            collate: "utfmb4_bin"
        });
    }

    static associate(db) {

    }
};

module.exports = User;