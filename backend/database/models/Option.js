module.exports = (sequelize, dataTypes) => {

    let alias = 'Option';

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        option: {
            type: dataTypes.STRING,
        },
        question_id: {
            type: dataTypes.INTEGER,
            foreignKey: true
        },
        is_correct: {
            type: dataTypes.INTEGER,
        }
    }

    let config = {
        tableName: 'options',
        timestamps: false,
        created_at: false,
        updated_at: false,
    }

    const Option = sequelize.define(alias, cols, config);
    Option.associate = (models) => {
        Option.belongsTo(models.Question, {
            foreignKey: 'question_id',
            as: 'question', // Alias para la relación
        });
    };

    return Option;
}