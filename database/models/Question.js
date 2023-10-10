module.exports = (sequelize, dataTypes) => {

    let alias = 'Question';

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        question: {
            type: dataTypes.STRING,
        },
        difficulty: {
            type: dataTypes.INTEGER,
        },
    }

    let config = {
        tableName: 'questions',
        timestamps: false,
        created_at: false,
        updated_at: false,
    }

    const Question = sequelize.define(alias, cols, config);

    Question.associate = (models) => {
        Question.hasMany(models.Option, {
            foreignKey: 'question_id',
            as: 'options', // Alias para la relación
        });
    };
    return Question;
}