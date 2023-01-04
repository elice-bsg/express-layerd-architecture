const Sequelize = require('sequelize');

class Board extends Sequelize.Model {
    static initiate(sequelize) {
        Board.init({
            title: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            content: {
                type: Sequelize.STRING(300),
                allowNull: false
            }
        }, {
            sequelize,
            timestamps: true,
            underscored: true,
            modelName: "Board",
            tableName: "board",
            paranoid: true,
            charset: "utfmb4",
            collate: "utf4mb4_bin"
        });
    }

    static associate(db) {
        db.Board.belongsTo(db.User, {
            foreignKey: "user_id",
            targetKey: "id"
        });
    }
}

module.exports = Board;